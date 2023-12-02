"use client"

import { useState } from "react"
import type { FormEvent, MouseEvent } from "react"
import { useRouter } from "next/navigation"

import { calculate } from "@/lib/utils"
import { AnswerType, TaskType } from "@/types"

export default function Answer({
  current,
  data,
  lastTask,
  answer,
  setAnswer,
  score,
  attempts,
  setAttempts,
}: {
  current: TaskType
  data: string[]
  lastTask: boolean
  answer: number
  setAnswer: any
  score: number
  attempts: number
  setAttempts: any
}) {
  // const [answer, setAnswer] = useState(0)
  const route = useRouter()
  const [answers, setAnswers] = useState<AnswerType[]>([])

  //function which sends answers attached to tasks to the database
  const send = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    //console.log(answer)

    //add answers to all tasks
    // store answers array to an array of tasks for updating
    //This returns objects that can be send as patch request with fetch api
    //id of each task is included to update correct task

    const tasksToUpdate = answers.map((answer) => {
      return {
        id: answer.id,
        answers: [
          {
            attempts: answer.answers[0].attempts + 1,
          },
        ],
      }
    })
    console.log(tasksToUpdate)
    //patch request which sends the answers array to api route: /api/restapi
    //route.ts in that path will handle this request
    try {
      const updatedTasks = await fetch(`/api/restapi`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasksToUpdate),
      })
      route.push("/result")
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
      // Check for duplicates before adding a new answer
      //Got this function to try stop duplicates from GPT
      const isDuplicate = answers.some(
        (a) => a.id === current.id && a.answers[0].attempts === attempts,
      )
      setAttempts((prev) => prev + 1)
      //if to avoid avoid duplices
      if (!isDuplicate) {
        //  setAttempts((prev) => prev + 1)
        if (attempts >= 3) {
          setAttempts(0)
        }
        setAnswers((prev: any) => [
          ...prev,
          { id: current.id, answers: [{ attempts: attempts }] },
        ])
      }
      console.log("Attemps: " + attempts)
      console.log(answers)
      if (attempts === 0) {
        return <div>You lost</div>
      }
    }
  }
  const [toggleAnswer, setToggleAnswer] = useState(false)
  const checkAnswer = () => {
    setToggleAnswer((prev) => !prev)
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
      <p>working</p>
      {attempts === 3 ? <button onClick={checkAnswer}>Se svar</button> : null}
      {toggleAnswer ? <p>{calculate(current, data)}</p> : null}
    </div>
  )
}
