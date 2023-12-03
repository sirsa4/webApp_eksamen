import type { TaskType } from "@/types"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
//import { answerList, generateTasks } from "@/lib/utils"
import { TypeAnswer } from "@/types"

export async function GET(request: NextRequest) {
  try {
    const allAnswers = await prisma.answer.findMany()
    //console.log(answerList)
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
  const body = (await request.json()) as { answers: AnswerType[] }
  console.log("============body in YOLO:=========================")
  console.log(body.answers)

  try {
    const requests = []

    for (const answer of body.answers) {
      // Create a new answer
      const newAnswer = await prisma.answer.create({
        data: {
          attempts: answer.attempts,
          operation: answer.operation,
          correct: answer.correct,
          taskId: answer.key,
        },
      })

      // Connect the new answer to the associated task
      const updateTask = await prisma.task.update({
        where: {
          id: answer.key,
        },
        data: {
          answers: {
            connect: {
              id: newAnswer.id,
            },
          },
        },
      })

      requests.push({ success: true, data: newAnswer, task: updateTask })
      console.log(
        "=================answer parameter i looop inside POST()=================",
      )
      console.log(answer)
    }

    return NextResponse.json(requests, { status: 207 })
  } catch (error) {
    console.error("Something went wrong:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    )
  }
}

//DELETE request for testing purpose during dev
export async function DELETE(request: NextRequest) {
  try {
    const deleteAnswers = await prisma.answer.deleteMany()
    //console.log(answerList)
    return NextResponse.json(
      { success: true, data: deleteAnswers },
      { status: 200 },
    )
  } catch {
    console.error("count is not correct")
  }
}
