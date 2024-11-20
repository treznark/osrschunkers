-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chunker_id" TEXT NOT NULL,
    "yt_video_id" TEXT NOT NULL,
    "yt_video_title" TEXT NOT NULL,
    "yt_video_description" TEXT NOT NULL,
    "yt_video_published_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);
