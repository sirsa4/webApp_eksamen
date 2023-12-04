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
    input,
    setInput,
    data,
    next,
    prev,
    answer,
    score,
    lastTask,
    setAnswer,
    attempts,
    setAttempts,
    toggleAnswer,
    checkAnswer,
    isCorrect,
    setIsCorrect,
    operation,
    setOperation,
    validate,
  } = useProgress(allTasks)

  // console.log("score: " + score)
  //console.log("count: " + (tasks.length - 1))
  console.log("===================Tasks component================== ")
  // console.log(current)
  console.log("hii")

  return (
    <>
  <div className="grid rounded-lg place-items-center border-2 border-solid border-gray-200 m-4  p-4 shadow-md">

<h1 className="text-lg font-bold mb-4 ">Tasks component</h1>
<h2 className="text-lg font-bold mb-3 ">
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
  toggleAnswer={toggleAnswer}
  checkAnswer={checkAnswer}
  operation={operation}
  setOperation={setOperation}
  isCorrect={isCorrect}
  setIsCorrect={setIsCorrect}
  validate={validate}
/>
<Progress
  current={current}
  data={data}
  next={next}
  prev={prev}
  answer={answer}
  score={score}
  lastTask={lastTask}
  isCorrect={isCorrect}
  attempts={attempts}
/>
</div>
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
