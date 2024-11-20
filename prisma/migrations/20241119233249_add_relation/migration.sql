-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_chunker_id_fkey" FOREIGN KEY ("chunker_id") REFERENCES "chunkers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
