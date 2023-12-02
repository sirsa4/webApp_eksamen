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
}: {
  current: TaskType
  data: string[]
  lastTask: boolean
  answer: number
  setAnswer: any
  score: number
  attempts: number
  setAttempts: any
  input: number
  setInput: any
}) {
  // const [answer, setAnswer] = useState(0)
  const route = useRouter()
  const [answers, setAnswers] = useState<AnswerType[]>([])
  const [at, setAt] = useState(0)
  const [an, setAn] = useState([])

  //function which sends answers attached to tasks to the database
  const send = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // console.log(answerList)
    try {
      const requests = []
      //GPT
      for (const [key, value] of answerList.entries()) {
        const response = await fetch(`/api/restapi/yolo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key, attempts: value.attempts }), // Assuming you want to send both key and attempts
        })

        const data = await response.json()
        console.log("Response from server:", data)

        requests.push(data)
      }

      // Do something with the results if needed
      // console.log("All requests completed:", requests)

      // Redirect to /result
      // route.push("/result");
    } catch (error) {
      console.error(error)
    }

    /*
    const items = answerList.forEach((val, key) => {
      console.log(`Key: ${key} - Value: ${val.attempts}`)
    })
    try {
      const updatedTasks = await fetch(`/api/restapi/yolo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerList),
      })
      // route.push("/result")
    } catch (error) {
      console.error(error)
    }
    */
  }

  const update = (event: FormEvent<HTMLFormElement>) => {
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
      // console.log("Attemps: " + attempts)
      // console.log(answers)
      if (attempts === 0) {
        return <div>You lost</div>
      }
    }
  }
  const [toggleAnswer, setToggleAnswer] = useState(false)
  const checkAnswer = () => {
    setToggleAnswer((prev) => !prev)
  }

  const validate = () => {
    const calc = calculate(current, data)

    setAttempts((prev: number) => prev + 1)

    if (calc === parseInt(input)) {
      // console.log(`Answer is: ${calc}`)
    }
    // console.log(attempts)
  }
  if (attempts >= 3) {
    setAttempts(3)
    // answerList.set(current.id, { attempts: attempts })
    //console.log(current.text)
    // console.log(current.type)
  }
  //answerList.size > 0 ? answerList.forEach((i) => console.log(i)) : null
  // answerList.set(current.id, { attempts: attempts })
  //console.log(answerList)

  return (
    <div>
      <section>
        <p>Attempts: {attempts} / 3</p>
      </section>
      <form onSubmit={send}>
        <div>
          <label htmlFor="answer">Svar</label>
          <input
            name="answer"
            type="text"
            placeholder="Sett svar her"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <section>
          {calculate(current, data) === answer ? "Bra jobbet!" : null}
          {lastTask ? <button type="submit">Send</button> : null}
          <p>working</p>
          <div>
            {attempts < 3 ? (
              <button type="button" onClick={validate}>
                Check answer
              </button>
            ) : null}
          </div>
        </section>
      </form>
      <div>
        {attempts === 3 ? <button onClick={checkAnswer}>Se svar</button> : null}
        {toggleAnswer ? <p>{calculate(current, data)}</p> : null}
      </div>
      <button type="button" onClick={send}>
        SEND
      </button>
    </div>
  )
}
