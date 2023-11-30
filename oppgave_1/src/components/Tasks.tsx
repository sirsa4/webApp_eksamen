"use client"

import { type ReactNode } from "react"

import { type TaskType } from "@/types"

<<<<<<< HEAD
export default function Tasks({ children }: { children: ReactNode }) {
=======
export default function Tasks({
  children,
  current,
  data,
}: {
  children: ReactNode
  current: TaskType
  data: string[]
}) {
>>>>>>> main
  const tasks: TaskType[] = [
    {
      id: "123",
      text: "Skriv resultatet av regneoperasjonen",
      type: "add",
      data: "num1 | num2",
    },
    {
      id: "234",
      text: "Skriv resultatet av regneoperasjonen",
      type: "add",
      data: "num1 | num2",
    },
    {
      id: "356",
      text: "Skriv resultatet av regneoperasjonen",
      type: "multiply",
      data: "num1 | num2",
    },
  ]

  return (
    <>
      <section>
        <article key={current?.id}>
          <p>{current?.type}</p>
          <h3>{current?.text}</h3>
          <p>
            {current ? parseInt(data[0]) : null} |{" "}
            {current ? parseInt(data[1]) : null}
          </p>
        </article>
        {children}
      </section>
    </>
  )
}
