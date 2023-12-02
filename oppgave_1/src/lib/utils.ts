import type { ClassValue } from "clsx"
import { faker } from "@faker-js/faker"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { TaskType } from "@/types"
import { prisma } from "./prisma"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""
  if (process.env.APP_URL) return `https://${process.env.APP_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

//Variable which stores different type of math operations
export const mathTypes = ["add", "divide", "multiply", "subtract"]

//source: https://github.com/mariuswallin/webapp-2023/blob/main/live-challenges/19.09.23-next-intro/src/features/responses/createResponse.ts
//Generic function which can be used to return random mathType in seed.ts and api routes
export const getRandomType = <T>(items: T[]) => {
  // Generate a random index within the array's length.
  const randomIndex = Math.floor(Math.random() * items.length)

  // Return the random item from the array.
  return items[randomIndex]
}

//function to generate random tasks where it is possible to specify number of tasks being created
export async function generateTasks(length: number) {
  await prisma.task.deleteMany()

  Array.from({ length: length }).map(async (_, i) => {
    await prisma.task.create({
      data: {
        text: faker.company.name(),
        type: getRandomType(mathTypes),
        //random made from strings: https://fakerjs.dev/api/random.html
        data: `${faker.string.numeric()} | ${faker.string.numeric()}`,
      },
    })
  })
}

//function to calculate 2 numbers
export const calculate = (current: TaskType, data: string[]) => {
  switch (current?.type) {
    case "add":
      return parseInt(data[0]) + parseInt(data[1])
    case "subtract":
      return parseInt(data[0]) - parseInt(data[1])
    case "multiply":
      // console.log(`${current.data[0]} | ${current.data[1]}`)
      //console.log(data)
      return parseInt(data[0]) * parseInt(data[1])
    case "divide":
      if (parseInt(data[1]) === 0) {
        return parseInt(data[0]) / parseInt(data[1] + 1)
      }
      return (parseInt(data[0]) / parseInt(data[1])).toFixed(2)
    default:
      return "nothing"
  }
}
