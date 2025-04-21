import mongoose from "mongoose"

// Use the environment variable directly
const MONGODB_URI = "mongodb+srv://admin:admin@ecommerce.mpshi.mongodb.net/finallandscaping?retryWrites=true&w=majority&appName=ECOMMERCE"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectToDatabase
