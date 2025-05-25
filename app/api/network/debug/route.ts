import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import NetworkSubitem from "@/models/NetworkSubitem"
import { serializeMongoData } from "@/lib/serialize-mongo"

export async function GET() {
  try {
    console.log("Testing MongoDB connection...")
    await connectToDatabase()
    console.log("MongoDB connection successful")

    // Get all network subitems
    const networks = await NetworkSubitem.find({}).lean()
    console.log(`Found ${networks.length} network subitems`)

    // Get MongoDB connection status
    const status = {
      connected: true,
      networkCount: networks.length,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      status,
      networks: serializeMongoData(networks),
    })
  } catch (error) {
    console.error("MongoDB debug error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
