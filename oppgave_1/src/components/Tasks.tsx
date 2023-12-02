"use client"

import { useState } from "react"
import type { ReactNode } from "react"

import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Task from "@/components/Task"
import TaskText from "@/components/Text"
import { useProgress } from "@/hooks/useProgress"
//import { useProgress } from "@/hooks/useProgress"
import { type TaskType } from "@/types"

export default function Tasks({ allTasks }: { allTasks: TaskType[] }) {
  const {
    tasks,
    current,
    data,
    next,
    prev,
    answer,
    score,
    lastTask,
    setAnswer,
    attempts,
    setAttempts,
  } = useProgress(allTasks)
  const [input, setInput] = useState()

  // console.log("score: " + score)
  //console.log("count: " + (tasks.length - 1))
  console.log("===================Tasks component================== ")
  // console.log(current)
  console.log("hii")

  return (
    <>
      <h1>Tasks component</h1>
      <h2>
        Tasks: {tasks.indexOf(current)}/{tasks.length - 1}
      </h2>
      <Task current={current} />
      <Answer
        current={current}
        data={data}
        score={score}
        answer={answer}
        attempts={attempts}
        lastTask={lastTask}
        setAnswer={setAnswer}
        setAttempts={setAttempts}
        input={input}
        setInput={setInput}
      />
      <Progress
        current={current}
        data={data}
        next={next}
        prev={prev}
        answer={answer}
        score={score}
        lastTask={lastTask}
      />
    </>
  )
}

/*
 <Header tasks={tasks} count={count} attempts={attempts} />
      <section>
        <article key={current?.id}>
          <p>{current?.type}</p>
          <h3>{current?.text}</h3>
          <p>
            {current ? parseInt(data[0]) : null} |{" "}
            {current ? parseInt(data[1]) : null}
          </p>
        </article>
      </section>
      <Answer
        current={current}
        data={data}
        lastTask={lastTask}
        answer={answer}
        setAnswer={setAnswer}
        score={score}
        attempts={attempts}
        setAttempts={setAttempts}
      />
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
      <p>Progress missing</p>
      <Progress
        current={current}
        data={data}
        next={next}
        prev={prev}
        answer={answer}
        score={score}
        lastTask={lastTask}
      />
*/
