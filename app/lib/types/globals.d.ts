import mongoose from "mongoose";

declare global {
    namespace globalThis {
        var mongoose: {
            conn: mongoose.Connection | null;
            promise: Promise<mongoose.Connection | null> | null;
        }
    }
}