"use client"

import { type ReactNode } from "react"

import { type TaskType } from "@/types"

export default function Tasks({
  children,
  current,
}: {
  children: ReactNode
  current: TaskType
}) {
  const tasks: TaskType[] = [
    {
      id: "123",
      text: "Skriv resultatet av regneoperasjonen",
      num1: 9,
      num2: 2,
      type: "add",
    },
    {
      id: "234",
      text: "Skriv resultatet av regneoperasjonen",
      num1: 9,
      num2: 2,
      type: "add",
    },
    {
      id: "356",
      text: "Skriv resultatet av regneoperasjonen",
      num1: 9,
      num2: 2,
      type: "multiply",
    },
  ]

  return (
    <section>
      <article key={current?.id}>
        <p>{current?.type}</p>
        <h3>{current?.text}</h3>
        <p>
          {current?.num1} | {current?.num2}
        </p>
      </article>
      {children}
    </section>
  )
}
