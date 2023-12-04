"use client"

import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"

import { createTasks } from "@/lib/utils"

const FormTask = () => {
  const [length, setLength] = useState(0)
  const route = useRouter()

  const handleCreateTasks = async (e: any) => {
    e.preventDefault()
    // createTasks(length)
    try {
      const newTasks = await fetch(`/api/restapi/tasks?count=${length}`, {
        method: "POST",
      })
      route.push("/tasks")
    } catch (error) {
      console.log(error)
    }
    // route.refresh()
  }
  return (
    <>
      <form
        className="flex h-screen w-full flex-col items-center justify-center"
        onSubmit={handleCreateTasks}
      >
        <header>
          <h1>Choose the number of tasks to solve</h1>
        </header>
        <section>
          <div>
            <label htmlFor="input">Tasks</label>
            <input
              type="text"
              name="input"
              id="input"
              placeholder="type number here"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </section>
        <div className="flex md:flex-col">
          <input className="md:justify-center" type="submit" value="Send" />
        </div>
      </form>
    </>
  )
}

export default FormTask
