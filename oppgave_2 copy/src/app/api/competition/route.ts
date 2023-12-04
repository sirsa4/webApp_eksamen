import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { CompetitionType, User } from "@/types/User"

export async function GET() {
  try {
    const res = await prisma.competition.findMany()
    return NextResponse.json({ data: res, status: 200 })
  } catch (error) {}
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CompetitionType
  //const user = request.nextUrl.searchParams.get("user")
  //console.log("user: " + user)

  const newCompetition = await prisma.competition.create({
    data: {
      name: body.name,
      date: body.date,
      location: body.location,
      goal: body.goal,
      sport: body.sport,
      priority: body.priority,
      comment: body.comment,
    },
  })

  const updateUser = await prisma.user.update({
    where: {
      id: body.userId,
    },
    data: {
      competitions: {
        connect: {
          id: newCompetition.id,
        },
      },
    },
  })

  console.log(body)
  return NextResponse.json({ newCompetition, status: 200 })
}

//DELETE route for dev
export const DELETE = async () => {
  try {
    const deleteCompetitions = await prisma.competition.deleteMany()
    return NextResponse.json({ msg: "competitions deleted", status: 200 })
  } catch (error) {
    console.log(error)
  }
}
