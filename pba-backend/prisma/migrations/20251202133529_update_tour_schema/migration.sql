-- AlterTable
ALTER TABLE "ItineraryItem" ADD COLUMN "image" TEXT;

-- AlterTable
ALTER TABLE "Tour" ADD COLUMN "address" TEXT;
ALTER TABLE "Tour" ADD COLUMN "latitude" REAL;
ALTER TABLE "Tour" ADD COLUMN "longitude" REAL;
ALTER TABLE "Tour" ADD COLUMN "metaDescription" TEXT;
ALTER TABLE "Tour" ADD COLUMN "metaTitle" TEXT;
ALTER TABLE "Tour" ADD COLUMN "salePrice" REAL;
ALTER TABLE "Tour" ADD COLUMN "videoUrl" TEXT;
ALTER TABLE "Tour" ADD COLUMN "zoom" INTEGER;

-- CreateTable
CREATE TABLE "TourFaq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tourId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    CONSTRAINT "TourFaq_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TourSurrounding" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tourId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "TourSurrounding_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
