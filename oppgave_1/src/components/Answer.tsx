"use client"

import { useState } from "react"
import type { FormEvent, MouseEvent } from "react"
import { useRouter } from "next/navigation"

import { answerList, calculate } from "@/lib/utils"
import { AnswerType, TaskType, TypeAnswer } from "@/types"

/*
  correct: true,
    tries: 1,
    operation: 'subtraction'
*/

export default function Answer({
  current,
  data,
  lastTask,
  answer,
  setAnswer,
  score,
  attempts,
  setAttempts,
  input,
  setInput,
  toggleAnswer,
  checkAnswer,
  operation,
  setOperation,
  isCorrect,
  setIsCorrect,
  validate,
}: {
  current: TaskType
  data: string[]
  lastTask: boolean
  answer: number
  setAnswer: any
  score: number
  attempts: number
  setAttempts: any
  input: string
  setInput: any
  toggleAnswer: boolean
  checkAnswer: () => void
  operation: string
  setOperation: any
  isCorrect: boolean
  setIsCorrect: any
  validate: () => void
}) {
  // const [answer, setAnswer] = useState(0)
  const route = useRouter()
  const [answers, setAnswers] = useState<AnswerType[]>([])
  const [correct, setCorrect] = useState(false)

  //function which sends answers attached to tasks to the database
  const send = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      const answersArray = Array.from(answerList.entries()).map(
        ([taskId, value]) => ({
          key: taskId,
          attempts: value.attempts,
          correct: value.correct,
          operation: value.operation,
        }),
      )
      console.log("==========answerArray in send()==============")
      console.log(answerList)
      const response = await fetch(`/api/restapi/yolo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: answersArray }),
      })

      const data = await response.json()
      console.log("Response from server:", data)

      // Redirect to /result to show final score
      route.push("/result")
    } catch (error) {
      console.error(error)
    }
  }

  if (attempts >= 3) {
    setAttempts(3)
    // answerList.set(current.id, { attempts: attempts })
    //console.log(current.text)
    // console.log(current.type)
  }
  console.log("isCorrect: " + isCorrect)

  return (
    <div>
      <section className="flex md:flex-col items-center">
        <p className="text-lg font-bold mb-1">Attempts: {attempts} / 3</p>
      </section>
      <form onSubmit={send}>
        <div className="flex md:flex-col items-center">
          <label htmlFor="answer">Svar</label>
          <input
            name="answer"
            type="text"
            placeholder="Sett svar her"
            value={input}
            className="  rounded-lg flex md:flex-col items-center mb-4"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <section className="flex md:flex-col items-center">
          {isCorrect ? "Bra jobbet!" : null}
          <div>
            {attempts < 3 ? (
              <button className=" mb-4 focus:shadow-outline rounded-lg bg-pink-300 px-4 py-2 font-bold text-white hover:bg-pink-600" type="button" onClick={validate}>
                Validate answer
              </button>
            ) : null}
          </div>
        </section>
      </form>
      <div >
        {attempts === 3 ? <button className=" mb-4 focus:shadow-outline rounded-lg bg-yellow-200 px-4 py-2" onClick={checkAnswer}>Se svar</button> : null}
        {toggleAnswer ? <p>{calculate(current, data)}</p> : null}
      </div>
      {lastTask ? (
        <button className="  mb-4 focus:shadow-outline rounded-lg bg-green-400 px-4 py-2 hover:bg-green-600 "
         type="submit" onClick={send}>
          Send
        </button>
      ) : null}
    </div>
  )
}
