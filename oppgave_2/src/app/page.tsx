"use client"
import React, { useState, useEffect } from 'react';
import AthleteForm from "@/components/Utøver";
import UsersList from '@/components/UsersList';

const Home = () => {
  const [athlete, setAthlete] = useState(() => {
  
    return null;
  });

  const handleNewAthlete = (newAthlete) => {
    setAthlete(newAthlete);
  };

  return (
    <div>
      <h1>Home</h1>
      <AthleteForm onNewAthlete={handleNewAthlete} />
      {athlete && (
        <div>
          <h2>Nyopprettet Utøver</h2>
          <p>id: {athlete.id}</p>
          <p>userid: {athlete.name}</p>
          <p>gender: {athlete.gender}</p>
          <p>Sport: {athlete.sport}</p>
        </div>
      )}
      <h2>Brukerliste fra API</h2>
      <UsersList />
    </div>
    
  );
};

export default Home;