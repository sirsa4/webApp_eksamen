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
    // SRC: kilde:https://nerdcave.com/tailwind-cheat-sheet
  }
  return (
    <>
    
      <form
        className="flex h-screen w-full flex-col items-center justify-center mb-4"
        onSubmit={handleCreateTasks}
      >
        <header>
          <h1 className="text-lg font-bold mb-4">Choose the number of tasks to solve</h1>
        </header>
        <section className="rounded-lg border border-gray-300 p-4 mb-4">
          <div className="mb-4 ">
            <label className=" rounded-lgtext-lg font-bold mb-4 "htmlFor="input">Tasks </label>
            <input
              type="text"
              name="input"
              id="input"
              placeholder="type number here"
              className="rounded-lg"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </section>
        <div className="flex md:flex-col items-center">
          <input 
           type="submit"
            value="Send"
          className="focus:shadow-outline rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none" />
        </div>
        
      </form>
    </>
  )
}

export default FormTask
