-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "profId" INTEGER NOT NULL,
    "orgId" INTEGER,
    CONSTRAINT "User_profId_fkey" FOREIGN KEY ("profId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "forenames" TEXT,
    "lastname" TEXT,
    "orgName" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "dob" DATETIME,
    "gender" TEXT,
    "height" REAL,
    "weight" REAL,
    "waist" REAL,
    "orgId" INTEGER,
    CONSTRAINT "Profile_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "questions" TEXT,
    "key" TEXT
);

-- CreateTable
CREATE TABLE "Program" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orgId" INTEGER,
    "title" TEXT NOT NULL,
    CONSTRAINT "Program_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "progId" INTEGER,
    "profId" INTEGER NOT NULL,
    "assId" INTEGER NOT NULL,
    "answers" TEXT,
    "results" TEXT,
    "recommendations" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Activity_progId_fkey" FOREIGN KEY ("progId") REFERENCES "Program" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Activity_profId_fkey" FOREIGN KEY ("profId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Activity_assId_fkey" FOREIGN KEY ("assId") REFERENCES "Assessment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profId_key" ON "User"("profId");

-- CreateIndex
CREATE UNIQUE INDEX "Program_orgId_title_key" ON "Program"("orgId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_email_key" ON "Otp"("email");
