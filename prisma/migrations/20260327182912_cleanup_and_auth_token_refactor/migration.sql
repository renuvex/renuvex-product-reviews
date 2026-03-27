/*
  Warnings:

  - The primary key for the `AuthToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deleted` on the `AuthToken` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `AuthToken` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `AuthToken` table. All the data in the column will be lost.
  - You are about to drop the `ProductSlugCache` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `authorizedAppId` on table `AuthToken` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."AuthToken_authorizedAppId_key";

-- AlterTable
ALTER TABLE "public"."AuthToken" DROP CONSTRAINT "AuthToken_pkey",
DROP COLUMN "deleted",
DROP COLUMN "id",
DROP COLUMN "type",
ALTER COLUMN "authorizedAppId" SET NOT NULL,
ADD CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("authorizedAppId");

-- DropTable
DROP TABLE "public"."ProductSlugCache";
