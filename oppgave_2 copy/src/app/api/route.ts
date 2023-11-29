import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const res = await prisma.user.findMany()
    return NextResponse.json({ data: res, status: 200 })
  } catch (error) {}
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  // console.log(data);
  return NextResponse.json({ body })
}
