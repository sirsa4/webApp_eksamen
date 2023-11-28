import React, { useEffect } from 'react';

const CreateUserTest = () => {
  async function fetchUserData(): Promise<User[]> {
    try {
      const response = await fetch('https://webapp-api.vercel.app/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  useEffect(() => {
    async function displayUserData() {
      try {
        const userData = await fetchUserData();
        console.log(userData);
      } catch (error) {
        console.error('Error displaying user data:', error);
      }
    }

    displayUserData();
  }, []); // Run this effect only once (on mount)

  return <div>CreateUser component content...</div>; // Replace this with your component UI
};

export default CreateUserTest;
