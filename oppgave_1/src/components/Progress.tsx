"use client"

import { useState } from "react"
import type { MouseEvent } from "react"

import { type TaskType } from "@/types"

export default function Progress({
  current,
  next,
  prev,
}: {
  current: TaskType
  next: () => void
  prev: () => void
}) {
  //const [state, setState] = useState(0)
  //const currentTask = props.tasks[state]

  return (
    <footer className="mt-4 border-t-slate-300">
      <p>{current?.id}</p>
      <button onClick={prev} className="bg-purple-700 text-white">
        Forrige
      </button>
      <button onClick={next} className="bg-teal-700 text-white">
        Neste
      </button>
    </footer>
  )
}
