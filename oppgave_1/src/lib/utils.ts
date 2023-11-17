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
        num1: parseInt(faker.string.numeric()),
        num2: parseInt(faker.string.numeric()),
      },
    })
  })
}

//function to calculate 2 numbers
export const calculate = (current: TaskType) => {
  switch (current?.type) {
    case "add":
      return current.num1 + current.num2
    case "subtract":
      return current.num1 - current.num2
    case "multiply":
      return current.num1 * current.num2
    case "divide":
      if(current.num2 === 0){
        return current.num2 + 1
      }
      return current.num1 / current.num2
    default:
      return "nothing"
  }
}
