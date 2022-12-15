/*
  Warnings:

  - You are about to drop the column `collectionsId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_collectionsId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "collectionsId";

-- CreateTable
CREATE TABLE "_CollectionsToImage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionsToImage_AB_unique" ON "_CollectionsToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionsToImage_B_index" ON "_CollectionsToImage"("B");

-- AddForeignKey
ALTER TABLE "_CollectionsToImage" ADD CONSTRAINT "_CollectionsToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionsToImage" ADD CONSTRAINT "_CollectionsToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
