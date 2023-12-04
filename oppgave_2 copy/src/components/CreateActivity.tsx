"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const CreateSession = () => {
  const [date, setDate] = useState("")
  const [name, setName] = useState("")
  const [tagsInput, setTagsInput] = useState([])
  const [activity, setActivity] = useState("")
  const [duration, setDuration] = useState("")
  const [intensity, setIntensity] = useState("")
  const [sport, setSport] = useState("")

  const searchParams = useSearchParams()
  const user = searchParams.get("user")
  const route = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const tags = tagsInput.split(",").map((tag) => tag.trim())
    // Her kan du utføre handlinger som å sende data til en API-endepunkt
    const newSession = {
      name,
      date: `${date}T00:00:00.000Z`,
      tags: tagsInput,
      sport: sport,
      duration,
      intensity,
      userId: user,
    }
    console.log("New Session:", newSession)
    //POST activity to a spesified way
    //POST a competition to data base.
    try {
      const response = await fetch(`http://localhost:3000/api/activity`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSession),
      })

      console.log(newSession)
      // Redirect to competition page
      route.push(`/users/${user}`)
    } catch (error) {
      console.error(error)
    }
    // Reset state etter innsending hvis nødvendig
    setDate("")
    setName("")
    setTagsInput([])
    setActivity("")
    setDuration("")
    setIntensity("")
  }

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
    <div className="w-full max-w-xs">
      <h1>Create New activity</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Date:
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
            Activity name:
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
            Tags:
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Select a sport:
          <select value={sport} onChange={(e) => setSport(e.target.value)}>
            {sportsOptions.map((sport, index) => (
              <option key={index} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </label>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Duration:
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Intensity:
          </label>
          <input
            type="number"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Create activity
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateSession
