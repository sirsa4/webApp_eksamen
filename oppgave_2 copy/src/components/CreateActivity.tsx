"use client"

import React, { useState } from "react";

const CreateSession = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [tagsInput, setTagsInput] = useState([]);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [sport, setSport] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();


    const tags = tagsInput.split(",").map(tag => tag.trim());
    // Her kan du utføre handlinger som å sende data til en API-endepunkt
    const newSession = { date, name, tags, activity, duration, intensity };
    console.log("New Session:", newSession);

    // Reset state etter innsending hvis nødvendig
    setDate("");
    setName("");
    setTagsInput([]);
    setActivity("");
    setDuration("");
    setIntensity("");
  };

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
      <h1 className="text-2xl font-bold mb-4 text-center ">Create New Session</h1>
      <form onSubmit={handleSubmit} className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">Activity name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">Tags:</label>
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
          <label className="mb-2 block text-sm font-bold text-gray-700">Duration:</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">Intensity:</label>
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
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSession;