-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "github_id" INTEGER NOT NULL,
    "avat_url" TEXT NOT NULL,
    "login" TEXT NOT NULL
);