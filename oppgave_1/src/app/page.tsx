"use client"

import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import { useProgress } from "@/hooks/useProgress"
import { TaskType } from "@/types"

export default function Home() {
  const { current, data, next, prev } = useProgress()
  return (
    <main className="flex flex-col items-center">
      {JSON.stringify(current)}
      <Header />
      <Tasks current={current} data={data}>
        <Answer current={current} data={data} />
      </Tasks>
      <Task />
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
      <Progress current={current} next={next} prev={prev} />
    </main>
  )
}
