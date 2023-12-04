import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const res = await prisma.competition.findUnique({
      where: {
        id: params.id,
      },
    })
    return NextResponse.json({ data: res, status: 200 })
  } catch (error) {
    console.error(error)
  }
}
