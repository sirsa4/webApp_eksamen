"use client"

import { useState } from "react"

import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import { useProgress } from "@/hooks/useProgress"

export default function Home() {
  const { current, data, next, prev, lastTask } = useProgress()
  const [answer, setAnswer] = useState(0)
  return (
    <main className="flex flex-col items-center">
      {JSON.stringify(current)}
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
      <Progress
        current={current}
        data={data}
        next={next}
        prev={prev}
        answer={answer}
      />
    </main>
  )
}
