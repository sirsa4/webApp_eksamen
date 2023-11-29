import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { User } from "@/types/User"

export async function GET() {
  try {
    const res = await prisma.user.findMany()
    return NextResponse.json({ data: res, status: 200 })
  } catch (error) {}
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as User

  // console.log(body);
  const newUser = await prisma.user.create({
    data: {
      id: body.id,
      userId: body.userId,
      gender: body.gender,
      sport: body.sport,
    },
  })
  return NextResponse.json({ newUser, status: 200 })
}
