/*
  Warnings:

  - Made the column `progId` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "progId" INTEGER NOT NULL,
    "profId" INTEGER NOT NULL,
    "assId" INTEGER NOT NULL,
    "answers" TEXT,
    "results" TEXT,
    "recommendations" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Activity_progId_fkey" FOREIGN KEY ("progId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Activity_profId_fkey" FOREIGN KEY ("profId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Activity_assId_fkey" FOREIGN KEY ("assId") REFERENCES "Assessment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("answers", "assId", "completed", "createdAt", "id", "profId", "progId", "recommendations", "results", "updatedAt") SELECT "answers", "assId", "completed", "createdAt", "id", "profId", "progId", "recommendations", "results", "updatedAt" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
