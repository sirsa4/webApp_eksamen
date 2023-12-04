"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const CreateCompetition = () => {
  const route = useRouter()
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [goal, setGoal] = useState("")
  const [competition, setCompetition] = useState("")
  const [priority, setPriority] = useState("")
  const [comment, setComment] = useState("")

  const [competitionByYear, setCompetitionByYear] = useState({})
  const searchParams = useSearchParams()

  const user = searchParams.get("user")

  // console.log("users id is: " + user)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    // const tags = tagsInput.split(",").map(tag => tag.trim());
    // // Her kan du utføre handlinger som å sende data til en API-endepunkt
    const newCompetition = {
      name,
      date: `${date}T00:00:00.000Z`,
      location,
      goal,
      sport: competition,
      priority,
      comment,
      userId: user,
    }
    console.log("New Session:", newCompetition)

    const year = new Date(date).getFullYear()
    if (competitionByYear[year] === undefined) {
      setCompetitionByYear({ ...competitionByYear, [year]: 1 })
    } else if (competitionByYear[year] < 3) {
      setCompetitionByYear({
        ...competitionByYear,
        [year]: competitionByYear[year] + 1,
      })
    } else {
      alert("Maximum sessions are reached for this year!")
      return
    }

    //POST a competition to data base.
    try {
      const response = await fetch(`http://localhost:3000/api/competition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompetition),
      })

      console.log(newCompetition)
      // Redirect to competition page
      route.push(`/users/${user}`)
    } catch (error) {
      console.error(error)
    }
    // Reset state etter innsending hvis nødvendig
    setName("")
    setDate("")
    setLocation("")
    setGoal("")
    setCompetition("")
    setPriority("")
    setComment("")
  }

  const priorities = ["A", "B", "C"]
  const sportsOptions = [
    "running",
    "cycling",
    "triathlon",
    "ski",
    "swimming",
    "weightlifting",
    "other",
  ]
  return (
    <div className=" w-full max-w-xs">
      <h1>Create new competition</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Competition name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Goal
        </label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter goal"
        />

        <label className="mb-2 block text-sm font-bold text-gray-700">
          Competition type
        </label>
        <select
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
        >
          {sportsOptions.map((sport, index) => (
            <option key={index} value={sport}>
              {sport}
            </option>
          ))}
        </select>

        <label className="mb-2 block text-sm font-bold text-gray-700">
          Select a priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {priorities.map((priority, index) => (
              <option key={index} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label className="mb-2 block text-sm font-bold text-gray-700">
          Comment
        </label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter comment"
        />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Create competition
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCompetition
