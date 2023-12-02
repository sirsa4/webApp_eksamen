import { useEffect, useState } from "react"

import { calculate } from "@/lib/utils"
import { type TaskType } from "@/types"

export function useProgress() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [count, setCount] = useState(0)
  const current = tasks[count] as TaskType
  const [lastTask, setLastTask] = useState(false)
  const [answer, setAnswer] = useState(0)
  const [score, setScore] = useState(0)
  const data = current?.data.split("|")
  // console.log(data)
  console.log("index: " + tasks.indexOf(tasks[count]))
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/restapi", {
          method: "get",
        })
        const result = (await response.json()) as TaskType[]
        setTasks(result.data)
        //   console.log(result)
        if (count === tasks.length - 1) {
          console.log(lastTask)
          setLastTask(true)
        } else {
          setLastTask(false)
        }
        console.log(lastTask)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    fetchData()
  }, [count])

  const next = () => {
    console.log("next: useProgress")
    if (count < tasks.length - 1) {
      setCount((prevCount) => prevCount + 1)
    } else {
      setCount(0)
    }
    if (calculate(current, data) === answer) {
      setScore((prev) => prev + 1)
    }
  }
  const prev = () => {
    console.log("prev: useProgress")
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
    } else {
      setCount(tasks.length - 1)
    }
  }

  return {
    tasks,
    count,
    current,
    lastTask,
    data,
    next,
    prev,
    score,
    answer,
    setAnswer,
  }
}
