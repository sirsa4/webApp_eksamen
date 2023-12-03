import { faker } from "@faker-js/faker"

import { prisma } from "@/lib/prisma"
import { calculate, getRandomType, mathTypes } from "@/lib/utils"
import { TaskType } from "@/types"
import { calculate2 } from "../src/lib/utils"

//create data with faker: https://www.youtube.com/watch?v=oPKS0FmCHA4
async function main() {
  await prisma.task.deleteMany()
  await prisma.answer.deleteMany()

  Array.from({ length: 3 }).map(async (_, i) => {
    let type = getRandomType(mathTypes)
    /*
    let num1 = faker.string.numeric();
    let num2 = faker.string.numeric();
    */
    let nums = `${faker.string.numeric()}|${faker.string.numeric()}`
    let dat = nums.split("|")
    let NumAnswer = calculate2(type, dat)
    let answer = `${NumAnswer}`
    //console.log(result)
    // console.log(dat)
    await prisma.task.create({
      data: {
        text: faker.company.name(),
        type: type,
        //random made from strings: https://fakerjs.dev/api/random.html
        data: nums,
        answer: answer,
      },
    })
  })
  Array.from({ length: 10 }).map(async (_, i) => {
    await prisma.answer.create({
      data: {
        attempts: faker.number.float(),
      },
    })
  })

  const tasks = await prisma.task.findMany()
  const answers = await prisma.answer.findMany()
}

main()
