// // File: app/api/industries/update/route.ts
// import { NextResponse } from 'next/server'
// import  connectToDatabase  from "@/lib/mongodb"
// import { ObjectId } from 'mongodb'
// export async function POST(request: Request) {
//   try {
//     const { categoryId, itemId, data } = await request.json()

//     console.log("categoryId:", categoryId)
//     console.log("itemId:", itemId)
//     console.log("data:", data)

//     if (!categoryId || !itemId || !data) {
//       return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
//     }

//     const { db } = await connectToDatabase()

//     const result = await db.collection('industries').updateOne(
//       { _id: itemId }, // assuming `itemId` is the `_id` field, convert to ObjectId if needed
//       { $set: { ...data, categoryId, updatedAt: new Date() } },
//       { upsert: false }
//     )

//     return NextResponse.json({ success: true, modifiedCount: result.modifiedCount })
//   } catch (error) {
//     console.error('MongoDB update error:', error)
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
//   }
// }

// export async function GET() {
//   return NextResponse.json({ message: 'Use POST for updates' }, { status: 405 })
// }
// File: app/api/industries/update/route.ts
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/connectToDatabase'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { categoryId, itemId, data } = body

    console.log("categoryId:", categoryId)
    console.log("itemId:", itemId)
    console.log("data:", data)

    if (!categoryId || !itemId || !data) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const result = await db.collection('industries').updateOne(
      { _id: new ObjectId(itemId) },
      { $set: { ...data, categoryId, updatedAt: new Date() } },
      { upsert: false }
    )

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount })
  } catch (error) {
    console.error('MongoDB update error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST for updates' }, { status: 405 })
}
