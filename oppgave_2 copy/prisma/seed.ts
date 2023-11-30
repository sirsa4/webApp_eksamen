import { prisma } from "@/lib/prisma"
import { Activity, Data } from "@/types/User"

async function main() {
  await prisma.user.deleteMany()
  await prisma.meta.deleteMany()

  try {
    const res = await fetch("https://webapp-api.vercel.app/api/users")
    const result = (await res.json()) as Data
    //Got bit help from GPT to create both tables at once. we could create each one alone, but struggled to create both at same time.
    for (const user of result.data) {
      const createdUser = await prisma.user.create({
        data: {
          id: user.id,
          userId: user.userId,
          gender: user.gender,
          sport: user.sport,
          activities: {
            create: user.activities?.map((ac: Activity) => ({
              id: ac.id,
              date: ac.date,
              name: ac.name,
            })),
          },
        },
      })

      console.log(`User created: ${createdUser.userId}`)
    }
  } catch (error) {
    console.error(error)
  }
}

main()
