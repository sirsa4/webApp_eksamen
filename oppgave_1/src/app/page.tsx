"use client"

import { useState } from "react"

import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
<<<<<<< HEAD
import { TaskType } from "@/types"
//import { Task } from "vitest"

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/restapi", {
    method: "get",
  })
  const result = await response.json () as TaskType []
  // console.log(result)

  return (
    <main className="flex flex-col items-center">
      {JSON.stringify(result)}
=======
import { useProgress } from "@/hooks/useProgress"

export default function Home() {
  const { current, data, next, prev, lastTask } = useProgress()
  const [answer, setAnswer] = useState(0)
  return (
    <main className="flex flex-col items-center">
      {JSON.stringify(current)}
>>>>>>> main
      <Header />
      <Tasks current={current} data={data}>
        <Answer
          current={current}
          data={data}
          lastTask={lastTask}
          answer={answer}
          setAnswer={setAnswer}
        />
      </Tasks>
      <Task />
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
<<<<<<< HEAD
      <Progress tasks={result}/>
=======
      <Progress
        current={current}
        data={data}
        next={next}
        prev={prev}
        answer={answer}
      />
>>>>>>> main
    </main>
  )
}
