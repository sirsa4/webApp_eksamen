import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { generateTasks } from "@/lib/utils"
import { type TaskType } from "@/types"

const tasks: TaskType[] = [
  {
    id: "124",
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    num1: 9,
    num2: 4,
  },
]

// TODO: Denne skal brukes til å "samle" svarene (om du ikke bruker database)
const answers = new Map<TaskType["id"], { attempts: number }>()

//Run this url to run this function: http://localhost:3000/api/restapi?count=10
export async function PUT(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  try {
    const newTasks = await generateTasks(parseInt(count))
    return NextResponse.json({ success: true, data: newTasks }, { status: 207 })
  } catch {
    console.error("Something went wrong")
  }
}

export async function GET(request: NextRequest) {
  const count = -1
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  try {
    const allTasks = await prisma.task.findMany()
    return NextResponse.json({ success: true, data: allTasks }, { status: 200 })
  } catch {
    console.error("count is not correct")
  }
}
