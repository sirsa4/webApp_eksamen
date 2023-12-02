import type { TaskType } from "@/types"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { generateTasks } from "@/lib/utils"
import { DataType } from "@/types"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const taskId = params.id
  const data = (await request.json()) as DataType
  //console.log(data.answers[0])
  console.log(data)
  try {
    // Check if the task with the given ID exists
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    })

    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      )
    }

    // Create a new Answer
    const createdAnswer = await prisma.answer.create({
      data: {
        attempts: data?.answers[0].attempts,
        taskId,
      },
    })

    // Update the Task by connecting the new Answer
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        // Add Answers to current task
        answers: {
          connect: {
            id: createdAnswer.id,
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: { task: updatedTask, answer: createdAnswer },
        message: "Task updated with attached Answer successfully",
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

//How to get params from url: https://github.com/mariuswallin/webapp-2023/blob/main/webapp-06/src/app/api/products/%5Bid%5D/route.ts

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const singleTask = await prisma.task.findUnique({
      where: {
        id: params.id,
      },
      include: { answers: true },
    })
    console.log(params.id)
    return NextResponse.json(
      { success: true, data: singleTask },
      { status: 200 },
    )
  } catch {
    console.error("task is not found")
  }
}
