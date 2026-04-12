// scripts/migrations/002-remove-size-sliders.mjs
// Çalıştırma: node scripts/migrations/002-remove-size-sliders.mjs
//
// 19 ayrı boyut slider key'ini (titleSize, reviewTextSize vb.) ve
// artık kullanılmayan themeMode key'ini WidgetSettings JSON'undan temizler.
// size ve thumbnailSize yoksa 'medium' default'unu set eder.
// Bir kez çalıştırılır, tekrar çalıştırmak güvenli (idempotent).

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const OLD_KEYS = [
  'titleSize', 'reviewTextSize', 'reviewTitleSize', 'authorSize',
  'replyNameSize', 'replyTextSize', 'photoTitleSize', 'avgRatingSize',
  'avgStarSize', 'reviewCountSize', 'recommendSize', 'btnTextSize',
  'barLabelSize', 'barCountSize', 'reviewDateSize', 'filterTextSize',
  'loadMoreSize', 'readMoreSize', 'helpfulSize', 'reviewStarSize',
  'reviewThumbnailSize', 'themeMode',
];

async function run() {
  const rows = await prisma.widgetSettings.findMany({ where: { widgetId: 'reviews' } });

  if (rows.length === 0) {
    console.log('Kayıt bulunamadı, işlem yok.');
    return;
  }

  let updated = 0;
  for (const row of rows) {
    const s = row.settings;
    const cleaned = Object.fromEntries(
      Object.entries(s).filter(([k]) => !OLD_KEYS.includes(k))
    );
    if (!cleaned.size) cleaned.size = 'medium';
    if (!cleaned.thumbnailSize) cleaned.thumbnailSize = 'medium';

    await prisma.widgetSettings.update({
      where: { id: row.id },
      data: { settings: cleaned },
    });
    updated++;
    console.log(`  ✓ storeId=${row.storeId} güncellendi`);
  }

  console.log(`\n${updated} kayıt temizlendi.`);
}

run()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
