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
  isCorrect,
  attempts,
}: {
  current: TaskType
  data: string[]
  next: () => void
  prev: () => void
  answer: number
  score: number
  lastTask: boolean
  isCorrect: boolean
  attempts: number
}) {
  //const [state, setState] = useState(0)
  //const currentTask = props.tasks[state]
  console.log("last tasks?: " + lastTask)
  console.log("progress attempts: " + attempts)
// SRC: kilde:https://nerdcave.com/tailwind-cheat-sheet
  return (
    <footer className="mt-4 border-t-slate-300">
    <p>{current?.id}</p>
    
    <button onClick={prev} className="focus:shadow-outline rounded-lg bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-900 ">
      Forrige oppgave
    </button>
    {(isCorrect && !lastTask) || (attempts === 3 && !lastTask) ? (
      <button onClick={next} className=" focus:shadow-outline rounded-lg bg-teal-700 px-4 py-2 font-bold text-white hover:bg-teal-900 ">
        Neste oppgave
      </button>
    ) : null}
  </footer>
  )
}
/*
|| (attempts === 3 && !lastTask) 
*/
/*
<button onClick={next} className="bg-teal-700 text-white">
        Neste oppgavke
      </button>
*/
