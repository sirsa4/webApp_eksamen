import type { TaskType } from "@/types"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { answerList, generateTasks } from "@/lib/utils"
import { TypeAnswer } from "@/types"

export async function GET(request: NextRequest) {
  try {
    const allAnswers = await prisma.answer.findMany()
    console.log(answerList)
    return NextResponse.json(
      { success: true, data: allAnswers },
      { status: 200 },
    )
  } catch {
    console.error("count is not correct")
  }
}

export async function POST(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  const body = (await request.json()) as TypeAnswer
  console.log("body in YOLO: ")
  console.log(body)

  try {
    /*
    const task = await prisma.task.findUnique({
      where: {
        id: body.key,
      },
    })
    */
    const newAnswer = await prisma.answer.create({
      data: {
        attempts: body.attempts,
        taskId: body.key,
      },
    })
    const updateTask = await prisma.task.update({
      where: {
        id: body.key,
      },
      data: {
        answers: {
          //We used GPT on how to connect tables. didnt understand from Docs
          connect: {
            id: newAnswer.id,
          },
        },
      },
    })
    return NextResponse.json(
      { success: true, data: newAnswer, task: updateTask },
      { status: 207 },
    )
  } catch {
    console.error("Something went wrong")
  }

  // return NextResponse.json({ body, status: 200 })
}

//DELETE request for testing purpose during dev
export async function DELETE(request: NextRequest) {
  try {
    const deleteAnswers = await prisma.answer.deleteMany()
    console.log(answerList)
    return NextResponse.json(
      { success: true, data: deleteAnswers },
      { status: 200 },
    )
  } catch {
    console.error("count is not correct")
  }
}
