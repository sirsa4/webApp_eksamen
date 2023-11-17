"use client"

import { useState } from "react"
import type { FormEvent, MouseEvent } from "react"

import { calculate } from "@/lib/utils"
import { TaskType } from "@/types"

export default function Answer({ current }: { current: TaskType }) {
  const [answer, setAnswer] = useState(1)

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(answer)
  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber)
    console.log(event.currentTarget.valueAsNumber)
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
      {calculate(current) === answer ? "Bra jobbet!" : null}
      <button onClick={send}>Send</button>
    </div>
  )
}
