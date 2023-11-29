import { faker } from "@faker-js/faker"

import { prisma } from "@/lib/prisma"

//create data with faker: https://www.youtube.com/watch?v=oPKS0FmCHA4
async function main() {
  await prisma.task.deleteMany()
  await prisma.answer.deleteMany()

  Array.from({ length: 10 }).map(async (_, i) => {
    await prisma.task.create({
      data: {
        text: faker.company.name(),
        type: faker.commerce.productName(),
        data: faker.lorem.paragraph(1),
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