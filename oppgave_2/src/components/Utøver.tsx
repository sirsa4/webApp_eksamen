"use client"
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface AthleteFormProps {
  onNewAthlete: (athlete: {
    id: string;
    name: string;
    gender: string;
    sport: string;
  }) => void;
}

const AthleteForm: React.FC<AthleteFormProps> = ({ onNewAthlete }) => {
  const [athlete, setAthlete] = useState({
    name: '',
    gender: '',
    sport: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAthlete = { ...athlete, id: uuidv4() }; // Genererer en unik ID
    onNewAthlete(newAthlete); // Sender den nye utøveren tilbake til overordnet komponent
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAthlete({ ...athlete, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <label>
        Navn:
        <input type="text" name="name" value={athlete.name} onChange={handleChange} />
      </label>
        <div>
          Kjønn:
        <label>
          Mann
        <input type="radio" name="gender" value="Mann" checked={athlete.gender === 'Mann'} onChange={handleChange} />
      </label>
      <label>
        Kvinne
        <input type="radio" name="gender" value="Kvinne" checked={athlete.gender === 'Kvinne'} onChange={handleChange} />
      </label>
      </div>
      <label>
        Sport:
        <select name="sport" value={athlete.sport} onChange={handleChange}>
          <option value="">Velg en sport</option>
          <option value="Løp">Løp</option>
          <option value="Sykkel">Sykkel</option>
          <option value="Ski">Ski</option>
          <option value="Triathlon">Triathlon</option>
          <option value="Svømming">Svømming</option>
          <option value="Styrke">Styrke</option>
          <option value="Annet">Annet</option>
        </select>
      </label>
      <button type="submit">Opprett Utøver</button>
    </form>
  );
};

export default AthleteForm;
