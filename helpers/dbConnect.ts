import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.${process.env.MONGODB_PROJECT}.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
                     //mongodb+srv://treznark:<db_password>@cluster0.vaxsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    mongoose.set("strictQuery", true);
    // cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
    //   return mongoose;
    // });
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;