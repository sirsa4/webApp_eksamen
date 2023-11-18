"use client"

import { useState } from "react"
import type { FormEvent, MouseEvent } from "react"

import { calculate } from "@/lib/utils"
import { TaskType } from "@/types"

export default function Answer({
  current,
  data,
}: {
  current: TaskType
  data: string[]
}) {
  const [answer, setAnswer] = useState(12)
  const [attempts, setAttempts] = useState(3)

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(answer)
  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(parseInt(event.currentTarget.value))
    if (calculate(current, data) !== answer) {
      setAttempts((prev) => prev - 1)
      console.log("Attemps: " + attempts)
      if (attempts === 0) {
        return <div>You lost</div>
      }
    }
  }

  return (
    <div>
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="text"
        placeholder="Sett svar her"
        onInput={update}
      />
      {calculate(current, data) === answer ? "Bra jobbet!" : null}
      <button onClick={send}>Send</button>
    </div>
  )
}
