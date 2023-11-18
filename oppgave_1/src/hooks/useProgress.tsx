import { useEffect, useState } from "react"

import { type TaskType } from "@/types"

export function useProgress() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [count, setCount] = useState(0)
  const current = tasks[count] as TaskType
  const data = current?.data.split("|")
  // console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/restapi", {
          method: "get",
        })
        const result = (await response.json()) as TaskType[]
        setTasks(result.data)
        //   console.log(result)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    fetchData()
  }, [])

  const next = () => {
    console.log("next: useProgress")
    if (count < tasks.length - 1) {
      setCount((prevCount) => prevCount + 1)
    } else {
      setCount(0)
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

  return { count, current, data, next, prev }
}
