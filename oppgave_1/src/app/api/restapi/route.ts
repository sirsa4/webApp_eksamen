import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

<<<<<<< HEAD
import { type TaskType } from "@/types"
import { prisma } from "@/lib/prisma"
=======
import { prisma } from "@/lib/prisma"
import { generateTasks } from "@/lib/utils"
import { type TaskType } from "@/types"
>>>>>>> main

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
<<<<<<< HEAD
    const allTasks = await prisma.task.findMany()
  return NextResponse.json({ success: true, data: tasks }, { status: 200 })
=======
  try {
    const allTasks = await prisma.task.findMany({ include: { answers: true } })
    return NextResponse.json({ success: true, data: allTasks }, { status: 200 })
  } catch {
    console.error("count is not correct")
  }
}

//PATCH route to update all tasks
export async function PATCH(request: NextRequest) {
  try {
    //get data from body that is sent from the front end
    const data = (await request.json()) as TaskType[]

    // loop over tasks in the request and handle each each one
    for (const taskData of data) {
      const taskId = taskData.id

      // first check is defined with data in each task
      //if here is no id sent with body, then it is not possible to attach answer to specific task
      if (!taskId) {
        return NextResponse.json(
          { success: false, error: "Task ID is missing" },
          { status: 404 },
        )
      }

      // check in database if task with same id as the one sent from frontend exists in database
      const existingTask = await prisma.task.findUnique({
        where: { id: taskId },
      })
      //if task similar id in database is not found, then we return 404
      if (!existingTask) {
        return NextResponse.json(
          { success: false, error: `Task with ID ${taskId} not found` },
          { status: 404 },
        )
      }

      // Create a new Answer if task with id similar to data being sent is found in database
      //answer is connected to tasks with taskId
      //used GPT to make this function work after errors
      const createdAnswer = await prisma.answer.create({
        data: {
          attempts: taskData?.answers[0].attempts,
          taskId,
        },
      })

      // Update the Task by connecting the new Answer
      // also used GPT to make this function work
      //we had to add attempts key in answers:{} to make it work in end
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          answers: {
            connect: {
              id: createdAnswer.id,
              attempts: createdAnswer.attempts,
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
>>>>>>> main
}
