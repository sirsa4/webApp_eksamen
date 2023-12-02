"use client"

import { useState } from "react"
import type { MouseEvent } from "react"

import { calculate } from "@/lib/utils"
import { type TaskType } from "@/types"

export default function Progress({
  current,
  data,
  next,
  prev,
  answer,
  score,
  lastTask,
}: {
  current: TaskType
  data: string[]
  next: () => void
  prev: () => void
  answer: number
  score: number
  lastTask: boolean
}) {
  //const [state, setState] = useState(0)
  //const currentTask = props.tasks[state]

  return (
    <footer className="mt-4 border-t-slate-300">
      <p>{current?.id}</p>
      <button onClick={prev} className="bg-purple-700 text-white">
        Forrige oppgave
      </button>
      {calculate(current, data) === answer && !lastTask ? (
        <button onClick={next} className="bg-teal-700 text-white">
          Neste oppgavke
        </button>
      ) : null}
      <button onClick={next} className="bg-teal-700 text-white">
        Neste oppgavke
      </button>
    </footer>
  )
}
