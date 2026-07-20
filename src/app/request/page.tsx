'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ChevronRight, Loader2, Send, SkipForward, Star } from 'lucide-react';

type ReviewCenterItem = {
  itemId: string;
  productId: string;
  productName: string | null;
  variantName: string | null;
  status: string;
  canSubmit: boolean;
};

type ReviewCenterPage = {
  items: ReviewCenterItem[];
  totalCount: number;
  remainingCount: number;
  nextCursor: string | null;
};

type ReadyState = ReviewCenterPage & {
  status: 'ready';
  currentIndex: number;
};

type PageState =
  | { status: 'loading' }
  | ReadyState
  | { status: 'completed' }
  | { status: 'error'; message: string };

async function exchangeToken(token: string): Promise<void> {
  const response = await fetch('/api/public/review-center/session', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Bu yorum bağlantısı geçersiz veya süresi dolmuş.');
}

async function fetchItems(cursor: string | null = null): Promise<ReviewCenterPage> {
  const url = new URL('/api/public/review-center/items', window.location.origin);
  url.searchParams.set('limit', '50');
  if (cursor) url.searchParams.set('cursor', cursor);
  const response = await fetch(url, { credentials: 'same-origin', cache: 'no-store' });
  const payload = await response.json().catch(() => null) as { data?: ReviewCenterPage } | null;
  if (!response.ok || !payload?.data) throw new Error('Yorum bağlantısı açılamadı.');
  return payload.data;
}

async function firstActionablePage(): Promise<ReviewCenterPage> {
  let cursor: string | null = null;
  for (let page = 0; page < 60; page += 1) {
    const result = await fetchItems(cursor);
    if (result.items.some((item) => item.canSubmit) || !result.nextCursor) return result;
    cursor = result.nextCursor;
  }
  throw new Error('Yorum listesi açılamadı.');
}

export default function ReviewRequestPage() {
  const [state, setState] = useState<PageState>({ status: 'loading' });
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const currentItem = useMemo(() => {
    if (state.status !== 'ready') return null;
    return state.items[state.currentIndex] ?? null;
  }, [state]);

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const token = fragment.get('token');
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    void (async () => {
      if (token) await exchangeToken(token);
      const page = await firstActionablePage();
      const currentIndex = page.items.findIndex((item) => item.canSubmit);
      if (page.remainingCount === 0 || currentIndex < 0) {
        setState({ status: 'completed' });
        return;
      }
      setState({ status: 'ready', ...page, currentIndex });
    })().catch((error: unknown) => setState({
      status: 'error',
      message: error instanceof Error ? error.message : 'Yorum bağlantısı açılamadı.',
    }));
  }, []);

  function resetItemForm(): void {
    setRating(5);
    setTitle('');
    setComment('');
  }

  async function loadNextItem(): Promise<void> {
    const page = await firstActionablePage();
    const currentIndex = page.items.findIndex((item) => item.canSubmit);
    if (page.remainingCount === 0 || currentIndex < 0) {
      setState({ status: 'completed' });
      return;
    }
    resetItemForm();
    setState({ status: 'ready', ...page, currentIndex });
  }

  async function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status !== 'ready' || !currentItem || submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(`/api/public/review-center/items/${encodeURIComponent(currentItem.itemId)}/reviews`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, author, title, comment, images: [], videoToken: null }),
      });
      const payload = await response.json().catch(() => null) as { data?: { batchCompleted?: boolean }; error?: string } | null;
      if (!response.ok || !payload?.data) throw new Error('Yorum gönderilemedi. Lütfen tekrar deneyin.');
      if (payload.data.batchCompleted) setState({ status: 'completed' });
      else await loadNextItem();
    } catch (error) {
      setState({ status: 'error', message: error instanceof Error ? error.message : 'Yorum gönderilemedi.' });
    } finally {
      setSubmitting(false);
    }
  }

  async function skipItem(): Promise<void> {
    if (state.status !== 'ready' || !currentItem || submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(`/api/public/review-center/items/${encodeURIComponent(currentItem.itemId)}/skip`, {
        method: 'POST',
        credentials: 'same-origin',
      });
      const payload = await response.json().catch(() => null) as { data?: { batchCompleted?: boolean } } | null;
      if (!response.ok || !payload?.data) throw new Error('Ürün atlanamadı. Lütfen tekrar deneyin.');
      if (payload.data.batchCompleted) setState({ status: 'completed' });
      else await loadNextItem();
    } catch (error) {
      setState({ status: 'error', message: error instanceof Error ? error.message : 'Ürün atlanamadı.' });
    } finally {
      setSubmitting(false);
    }
  }

  async function deferItem(): Promise<void> {
    if (state.status !== 'ready' || !currentItem || submitting) return;
    const nextLocal = state.items.findIndex((item, index) => index > state.currentIndex && item.canSubmit);
    if (nextLocal >= 0) {
      resetItemForm();
      setState({ ...state, currentIndex: nextLocal });
      return;
    }
    if (state.nextCursor) {
      setSubmitting(true);
      try {
        const page = await fetchItems(state.nextCursor);
        const currentIndex = page.items.findIndex((item) => item.canSubmit);
        if (currentIndex >= 0) {
          resetItemForm();
          setState({ status: 'ready', ...page, currentIndex });
          return;
        }
      } catch (error) {
        setState({ status: 'error', message: error instanceof Error ? error.message : 'Sıradaki ürün açılamadı.' });
      } finally {
        setSubmitting(false);
      }
    }
    const firstLocal = state.items.findIndex((item) => item.canSubmit);
    if (firstLocal >= 0 && firstLocal !== state.currentIndex) {
      resetItemForm();
      setState({ ...state, currentIndex: firstLocal });
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10 text-[#172026] sm:py-16">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border border-[#dce2e6] bg-white shadow-sm">
        <header className="border-b border-[#e7ebee] px-6 py-5 sm:px-8">
          <div className="text-lg font-semibold">Renuvex</div>
          {state.status === 'ready' && (
            <div className="mt-3 flex items-center gap-3 text-sm text-[#65747d]">
              <div className="h-1.5 flex-1 overflow-hidden rounded bg-[#e7ebee]">
                <div
                  className="h-full bg-[#172026] transition-[width]"
                  style={{ width: `${state.totalCount > 0 ? ((state.totalCount - state.remainingCount) / state.totalCount) * 100 : 100}%` }}
                />
              </div>
              <span>{state.totalCount - state.remainingCount}/{state.totalCount}</span>
            </div>
          )}
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

        {state.status === 'completed' && (
          <div className="px-6 py-16 text-center sm:px-8" aria-live="polite">
            <CheckCircle2 className="mx-auto size-9 text-[#14804a]" aria-hidden="true" />
            <h1 className="mt-4 text-xl font-semibold">Değerlendirmeleriniz alındı</h1>
          </div>
        )}

        {state.status === 'ready' && currentItem && (
          <form className="space-y-6 px-6 py-8 sm:px-8" onSubmit={submitReview}>
            <div>
              <h1 className="text-xl font-semibold">{currentItem.productName ?? 'Ürün yorumu'}</h1>
              {currentItem.variantName && <p className="mt-1 text-sm text-[#65747d]">{currentItem.variantName}</p>}
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
                    <Star className={`size-7 ${value <= rating ? 'fill-[#f4b400] text-[#f4b400]' : 'text-[#aab4ba]'}`} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block text-sm font-medium">
              Adınız
              <input
                required
                maxLength={120}
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                className="mt-2 h-11 w-full rounded border border-[#cbd3d8] px-3 outline-none focus:border-[#172026]"
              />
            </label>

            <label className="block text-sm font-medium">
              Başlık
              <input
                maxLength={160}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-2 h-11 w-full rounded border border-[#cbd3d8] px-3 outline-none focus:border-[#172026]"
              />
            </label>

            <label className="block text-sm font-medium">
              Yorumunuz
              <textarea
                required
                maxLength={2000}
                rows={5}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="mt-2 w-full resize-y rounded border border-[#cbd3d8] px-3 py-2 outline-none focus:border-[#172026]"
              />
            </label>

            <button
              type="submit"
              disabled={submitting || !author.trim() || !comment.trim()}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded bg-[#172026] px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
              Gönder ve devam et
            </button>

            <div className="flex flex-col gap-2 border-t border-[#e7ebee] pt-4 sm:flex-row sm:justify-between">
              <button
                type="button"
                disabled={submitting}
                onClick={() => void skipItem()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded px-3 text-sm text-[#52616b] hover:bg-[#f1f3f4] disabled:opacity-50"
              >
                <SkipForward className="size-4" aria-hidden="true" />
                Bu ürünü değerlendirmek istemiyorum
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => void deferItem()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded px-3 text-sm font-medium hover:bg-[#f1f3f4] disabled:opacity-50"
              >
                Daha sonra
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
