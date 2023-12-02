"use client"

import React, { useState } from "react";

const CreateSession = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [goal, setGoal] = useState("");
  const [comment, setComment] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();


    // const tags = tagsInput.split(",").map(tag => tag.trim());
    // // Her kan du utføre handlinger som å sende data til en API-endepunkt
    const newCompetition = { name, date, goal, comment};
    console.log("New Session:", newCompetition);

    // Reset state etter innsending hvis nødvendig
    setName("");
    setDate("");
    setGoal("");
    setComment("");
  };

  
  
  return (
    <div className=" w-full max-w-xs">
      <h1>Session target</h1>
      <form onSubmit={handleSubmit} className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">Session name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
    
        
        <label className="mb-2 block text-sm font-bold text-gray-700">Goal</label>
             <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter a number"
          />

          <label className="mb-2 block text-sm font-bold text-gray-700">Comment</label>
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
            Create new session target
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Create session target
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSession;