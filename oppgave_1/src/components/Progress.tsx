"use client"

import { useState } from "react"
import type { MouseEvent } from "react"

<<<<<<< HEAD
import { type TaskType } from "@/types"

export default function Progress(props: { tasks: TaskType[] }) {
  const [state, setState] = useState(0)
  const currentTask = props.tasks[state]

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setState(state + 1)
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setState(state - 1)
  }

  return (
    <footer className="mt-4 border-t-slate-300">
      <p>id:{currentTask?.id}</p>
      <button onClick={next} className="bg-purple-700 text-white">
        Forrige
      </button>
      <button onClick={prev} className="bg-teal-700 text-white">
        Neste
=======
import { calculate } from "@/lib/utils"
import { type TaskType } from "@/types"

export default function Progress({
  current,
  data,
  next,
  prev,
  answer,
}: {
  current: TaskType
  data: string[]
  next: () => void
  prev: () => void
  answer: number
}) {
  //const [state, setState] = useState(0)
  //const currentTask = props.tasks[state]

  return (
    <footer className="mt-4 border-t-slate-300">
      <p>{current?.id}</p>
      <button onClick={prev} className="bg-purple-700 text-white">
        Forrige oppgave
>>>>>>> main
      </button>
      {calculate(current, data) === answer ? (
        <button onClick={next} className="bg-teal-700 text-white">
          Neste oppgavke
        </button>
      ) : null}
    </footer>
  )
}
