import React from "react"

import { TaskType } from "@/types"

const Task = ({ current }: { current: TaskType }) => {
  // SRC: kilde:https://nerdcave.com/tailwind-cheat-sheet
  return (
    <div className="flex flex-col border-2 border-solid border-gray-300 m-4 rounded-lg p-4 shadow-md">
    <article className="flex flex-col items-center" key={current.id}>
      <p className="text-xl font-bold mb-2 text-gray-800">{current.text}</p>
      <p className="text-base mb-2 text-gray-600">{current.type}</p>
      <p className="text-base text-gray-700">{current.data}</p>
    </article>
  </div>
  )
}

export default Task
