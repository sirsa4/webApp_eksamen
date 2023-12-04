import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { Activity, ActivityData, User } from "@/types/User"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const res = await prisma.activity.findMany()
    return NextResponse.json({ data: res, status: 200 })
  } catch (error) {
    console.error(error)
  }
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as ActivityData
  //const user = request.nextUrl.searchParams.get("user")
  //console.log("user: " + user)
  console.log(body)
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    })
    if (!currentUser) {
      return NextResponse.json({ msg: "User does not exist", status: 404 })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        activities: {
          create: {
            name: body.name,
            date: body.date,
            tags: body.tags,
            sport: body.sport,
            intervals: {
              create: {
                duration: body.duration,
                intensity: body.intensity,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ data: updatedUser, status: 200 })
  } catch (error) {
    console.error(error)
  }
}
