/*
  Warnings:

  - Made the column `orgId` on table `Program` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Program" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orgId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    CONSTRAINT "Program_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Program" ("id", "orgId", "title") SELECT "id", "orgId", "title" FROM "Program";
DROP TABLE "Program";
ALTER TABLE "new_Program" RENAME TO "Program";
CREATE UNIQUE INDEX "Program_orgId_title_key" ON "Program"("orgId", "title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
