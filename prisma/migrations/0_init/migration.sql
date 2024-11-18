-- CreateTable
CREATE TABLE "chunkers" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "yt_channel_id" TEXT NOT NULL,
    "yt_channel_name" TEXT NOT NULL,
    "yt_subscriber_count" INTEGER NOT NULL,
    "osrs_username" TEXT NOT NULL,
    "starting_chunk" TEXT NOT NULL,
    "ruleset" TEXT NOT NULL,

    CONSTRAINT "chunkers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chunkers_slug_key" ON "chunkers"("slug");

