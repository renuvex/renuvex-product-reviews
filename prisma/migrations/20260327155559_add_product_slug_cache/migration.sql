-- CreateTable
CREATE TABLE "public"."ProductSlugCache" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSlugCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductSlugCache_storeId_idx" ON "public"."ProductSlugCache"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSlugCache_storeId_slug_key" ON "public"."ProductSlugCache"("storeId", "slug");
