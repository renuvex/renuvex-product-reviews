'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Send, Star } from 'lucide-react';

type ReviewRequestData = {
  status: 'active';
  storeId: string;
  productId: string;
  sessionExpiresAt: string;
  requestExpiresAt: string | null;
  productName: string | null;
  variantName: string | null;
};

type PageState =
  | { status: 'loading' }
  | { status: 'ready'; data: ReviewRequestData }
  | { status: 'submitted' }
  | { status: 'error'; message: string };

async function loadReviewRequest(token: string | null): Promise<ReviewRequestData> {
  const response = await fetch('/api/public/review-request', {
    method: token ? 'POST' : 'GET',
    credentials: 'same-origin',
    headers: token ? { 'Content-Type': 'application/json' } : undefined,
    body: token ? JSON.stringify({ token }) : undefined,
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => null) as { data?: ReviewRequestData } | null;
  if (!response.ok || !payload?.data) throw new Error('Bu yorum bağlantısı geçersiz veya süresi dolmuş.');
  return payload.data;
}

export default function ReviewRequestPage() {
  const [state, setState] = useState<PageState>({ status: 'loading' });
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const token = fragment.get('token');
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    void loadReviewRequest(token)
      .then((data) => setState({ status: 'ready', data }))
      .catch((error: unknown) => setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Yorum bağlantısı açılamadı.',
      }));
  }, []);

  async function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status !== 'ready' || submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch('/api/public/reviews', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: state.data.storeId,
          productId: state.data.productId,
          rating,
          author,
          title,
          comment,
          images: [],
        }),
      });
      if (!response.ok) throw new Error('Yorum gönderilemedi. Lütfen tekrar deneyin.');
      setState({ status: 'submitted' });
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Yorum gönderilemedi.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10 text-[#172026] sm:py-16">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border border-[#dce2e6] bg-white shadow-sm">
        <header className="border-b border-[#e7ebee] px-6 py-5 sm:px-8">
          <div className="text-lg font-semibold">Renuvex</div>
        </header>

        {state.status === 'loading' && (
          <div className="flex min-h-72 items-center justify-center" aria-live="polite">
            <Loader2 className="size-6 animate-spin text-[#52616b]" aria-hidden="true" />
            <span className="sr-only">Yükleniyor</span>
          </div>
        )}

        {state.status === 'error' && (
          <div className="px-6 py-16 text-center sm:px-8" role="alert">
            <h1 className="text-xl font-semibold">Bağlantı açılamadı</h1>
            <p className="mt-3 text-sm text-[#52616b]">{state.message}</p>
          </div>
        )}

        {state.status === 'submitted' && (
          <div className="px-6 py-16 text-center sm:px-8" aria-live="polite">
            <CheckCircle2 className="mx-auto size-9 text-[#14804a]" aria-hidden="true" />
            <h1 className="mt-4 text-xl font-semibold">Yorumunuz alındı</h1>
          </div>
        )}

        {state.status === 'ready' && (
          <form className="space-y-6 px-6 py-8 sm:px-8" onSubmit={submitReview}>
            <div>
              <h1 className="text-xl font-semibold">{state.data.productName ?? 'Ürün yorumu'}</h1>
              {state.data.variantName && <p className="mt-1 text-sm text-[#65747d]">{state.data.variantName}</p>}
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-medium">Puanınız</legend>
              <div className="flex gap-1" role="radiogroup" aria-label="Puanınız">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="flex size-10 items-center justify-center rounded border border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172026]"
                    aria-label={`${value} yıldız`}
                    aria-pressed={rating === value}
                    onClick={() => setRating(value)}
                  >
                    <Star
                      className={`size-7 ${value <= rating ? 'fill-[#f4b400] text-[#f4b400]' : 'text-[#aab4ba]'}`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block text-sm font-medium">
              Adınız
              <input
                required
                maxLength={40}
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                className="mt-2 h-11 w-full rounded border border-[#cbd3d8] px-3 outline-none focus:border-[#172026]"
              />
            </label>

            <label className="block text-sm font-medium">
              Başlık
              <input
                maxLength={60}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-2 h-11 w-full rounded border border-[#cbd3d8] px-3 outline-none focus:border-[#172026]"
              />
            </label>

            <label className="block text-sm font-medium">
              Yorumunuz
              <textarea
                maxLength={2000}
                rows={5}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="mt-2 w-full resize-y rounded border border-[#cbd3d8] px-3 py-2 outline-none focus:border-[#172026]"
              />
            </label>

            <button
              type="submit"
              disabled={submitting || !author.trim()}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded bg-[#172026] px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
              Yorumu gönder
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
