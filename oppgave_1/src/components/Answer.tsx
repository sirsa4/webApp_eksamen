"use client"

import { useState } from "react"
import type { FormEvent, MouseEvent } from "react"

import { calculate } from "@/lib/utils"
import { TaskType } from "@/types"

export default function Answer({
  current,
  data,
  lastTask,
  answer,
  setAnswer,
}: {
  current: TaskType
  data: string[]
  lastTask: boolean
  answer: number
  setAnswer: any
}) {
  // const [answer, setAnswer] = useState(0)
  const [attempts, setAttempts] = useState(3)

  const send = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    //console.log(answer)
    const updatedTask = await fetch(`/api/restapi/${current.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: current.id,
        answer,
        attempts,
      }),
    })
    try {
    } catch (error) {
      console.error(error)
    }
  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(parseInt(event.currentTarget.value))

    //check if answer is not correct - meaning answer from user is not same as return value of calcuate()
    if (calculate(current, data) !== answer) {
      //decrememnt number attempts by 1 each time wrong answer is given by users
      //this is buggy since each keystroke is counted as an attemp. Example if correct answer is 12, that would atleast 1 attemp when user types numkey 1, then numkey 2 will also be another attempt.
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
      {lastTask ? <button onClick={send}>Send</button> : null}
    </div>
  )
}
