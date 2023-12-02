import React from "react"

import { TaskType } from "@/types"

const Task = ({ current }: { current: TaskType }) => {
  return (
    <>
      <article key={current.id}>
        <p>{current.text}</p>
        <p>{current.type}</p>
        <p>{current.data}</p>
      </article>
    </>
  )
}

export default Task
