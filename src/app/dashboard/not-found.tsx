import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <div className="rounded-lg border border-dashed bg-muted/30 p-10 text-center">
      <h2 className="text-lg font-semibold">Yönetim sayfası bulunamadı</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Bu adres mevcut değil veya kullanıma açık değil.
      </p>
      <Link
        href="/dashboard/widgets"
        prefetch={false}
        className="mt-5 inline-flex min-h-9 items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Widgetlara dön
      </Link>
    </div>
  );
}
