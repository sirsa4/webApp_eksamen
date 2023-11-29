import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type TaskType } from "@/types"
import { prisma } from "@/lib/prisma"

const tasks: TaskType[] = [
  {
    id: "124",
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    data: "9|4",
  },
]

// TODO: Denne skal brukes til å "samle" svarene (om du ikke bruker database)
const answers = new Map<TaskType["id"], { attempts: number }>()

export function PUT(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: tasks }, { status: 207 })
}

export async function GET(request: NextRequest) {
  const count = -1
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
    const allTasks = await prisma.task.findMany()
  return NextResponse.json({ success: true, data: tasks }, { status: 200 })
}
