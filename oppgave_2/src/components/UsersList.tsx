import React, { useState, useEffect } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://webapp-api.vercel.app/api/users?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data.data);
        setTotalPages(data.pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage(current => Math.min(current + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage(current => Math.max(current - 1, 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.userId} - {user.gender} - {user.sport}</p>
        </div>
      ))}
      <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
      <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default UsersList;
