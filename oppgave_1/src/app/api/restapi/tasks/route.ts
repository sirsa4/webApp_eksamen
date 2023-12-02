import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { generateTasks } from "@/lib/utils"
import { type TaskType } from "@/types"

export async function GET(request: NextRequest) {
  const count = -1
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  try {
    const allTasks = await prisma.task.findMany({ include: { answers: true } })
    return NextResponse.json({ success: true, data: allTasks }, { status: 200 })
  } catch {
    console.error("count is not correct")
  }
}

export async function POST(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  console.log(count)

  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  try {
    const newTasks = await generateTasks(parseInt(count))
    return NextResponse.json({ success: true, data: newTasks }, { status: 207 })
  } catch {
    console.error("Something went wrong")
  }

  return NextResponse.json({ count, status: 200 })
}
