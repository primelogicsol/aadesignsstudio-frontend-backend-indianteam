import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Task from "@/models/task"

export async function GET() {
  try {
    await connectToDatabase()
    const tasks = await Task.find({}).sort({ createdAt: -1 })

    return NextResponse.json({ tasks }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, status } = body

    await connectToDatabase()

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
    })

    return NextResponse.json({ task }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
