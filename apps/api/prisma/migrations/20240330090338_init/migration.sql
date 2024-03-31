-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OAuthAccount" (
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "OAuthAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OAuthAccount" ("provider", "provider_account_id", "user_id") SELECT "provider", "provider_account_id", "user_id" FROM "OAuthAccount";
DROP TABLE "OAuthAccount";
ALTER TABLE "new_OAuthAccount" RENAME TO "OAuthAccount";
CREATE UNIQUE INDEX "OAuthAccount_provider_provider_account_id_key" ON "OAuthAccount"("provider", "provider_account_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
