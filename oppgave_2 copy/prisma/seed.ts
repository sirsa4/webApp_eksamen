import { prisma } from "@/lib/prisma"
import { Data } from "@/types/User"

async function main() {
  await prisma.user.deleteMany()
  await prisma.meta.deleteMany()
  console.log("Running")
  try {
    const res = await fetch("https://webapp-api.vercel.app/api/users")
    const result = (await res.json()) as Data
    // console.log(result.data)

    result.data.map(async (user) => {
      await prisma.user.create({
        data: {
          id: user.id,
          userId: user.userId,
          gender: user.gender,
          sport: user.sport,
        },
      })
    })
  } catch (error) {
    console.error(error)
  }
}

main()
