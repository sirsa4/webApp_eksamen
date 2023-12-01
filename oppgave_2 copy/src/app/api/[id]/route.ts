import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { Activity, User } from "@/types/User"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const res = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        activities: {
          include: {
            intervals: true,
          },
        },
      },
    })
    return NextResponse.json({ data: res, status: 200 })
  } catch (error) {}
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = (await request.json()) as Activity
  console.log(params.id)
  console.log(
    "==============================Look==================================",
  )
  console.log(body)
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    })
    if (!currentUser) {
      return NextResponse.json({ msg: "User does not exist", status: 404 })
    }
    console.log("curren user: " + currentUser)
    console.log(params.id)
    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        activities: {
          create: {
            date: body.date,
            name: body.name,
            tags: body.tags,
            intervals: {
              create: body.intervals?.map((inter) => ({
                duration: inter.duration,
                intensity: inter.intensity,
              })),
            },
          },
        },
      },
    })

    return NextResponse.json({ data: updatedUser, status: 200 })
  } catch (error) {
    console.error(error)
  }

  return NextResponse.json({ body, status: 200 })
}
