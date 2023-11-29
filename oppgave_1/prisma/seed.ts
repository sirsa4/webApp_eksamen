import { faker } from "@faker-js/faker"

import { prisma } from "@/lib/prisma"
<<<<<<< HEAD
=======
import { getRandomType, mathTypes } from "@/lib/utils"
>>>>>>> main

//create data with faker: https://www.youtube.com/watch?v=oPKS0FmCHA4
async function main() {
  await prisma.task.deleteMany()
  await prisma.answer.deleteMany()

<<<<<<< HEAD
  Array.from({ length: 10 }).map(async (_, i) => {
    await prisma.task.create({
      data: {
        text: faker.company.name(),
        type: faker.commerce.productName(),
        data: faker.lorem.paragraph(1),
=======
  Array.from({ length: 3 }).map(async (_, i) => {
    await prisma.task.create({
      data: {
        text: faker.company.name(),
        type: getRandomType(mathTypes),
        //random made from strings: https://fakerjs.dev/api/random.html
        data: `${faker.string.numeric()} | ${faker.string.numeric()}`,
>>>>>>> main
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