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
    data: "num1 | num2",
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
    const allTasks = await prisma.task.findMany({ include: { answers: true } })
    return NextResponse.json({ success: true, data: allTasks }, { status: 200 })
  } catch {
    console.error("count is not correct")
  }
}

// PATCH route to update all tasks
export async function PATCH(request: NextRequest) {
  try {
    // get data from body that is sent from the front end
    const data = (await request.json()) as TaskType[]

    // loop over tasks in the request and handle each one
    for (const taskData of data) {
      const taskId = taskData.id

      // first check if defined with data in each task
      // if there is no id sent with body, then it is not possible to attach an answer to a specific task
      if (!taskId) {
        return NextResponse.json(
          { success: false, error: "Task ID is missing" },
          { status: 404 },
        )
      }

      // Create a new Answer for each task
      const createdAnswer = await prisma.answer.create({
        data: {
          attempts: taskData?.answers[0].attempts,
          taskId,
        },
      })

      // Connect the created answer to the task
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          answers: {
            connect: {
              id: createdAnswer.id,
            },
          },
        },
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Tasks updated with answers on each task",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Something went wrong", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    )
  }
}
