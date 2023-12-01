"use client"

import React, { useEffect, useState } from "react"

import { User } from "@/types/User"

const CreateUser = () => {
  const [userId, setUserId] = useState()
  const [gender, setGender] = useState()
  const [sport, setSport] = useState()
  const [newUser, setNewUser] = useState({
    userId: "",
    gender: "",
    sport: "",
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewUser({ ...newUser, [name]: value })
  }
  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setNewUser({ ...newUser, sport: value })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // console.log("New user:", newUser)
    console.log({ userId, gender, sport })
    if (userId && gender && sport) {
      const newlyUser = { userId, gender, sport }
      const postUser = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newlyUser),
      })
    }
   
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
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            ID:
            <input
              type="text"
              name="id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </label>
          <br />
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Gender:
            <input
              type="text"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <br />
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
        </div>
        <br />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  )
}
export default CreateUser

// const CreateUser = () => {
//   async function fetchUserData(): Promise<User[]> {
//     try {
//       const response = await fetch('https://webapp-api.vercel.app/api/users');
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data: User[] = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Fetching error', error);
//       return [];
//     }
//   }

//     async function displayUserData() {
//       try {
//         const userData = await fetchUserData();
//         console.log(userData);
//       } catch (error) {
//         console.error('User data display error:', error);
//       }
//     }

//     displayUserData();

//   return <div>CreateUser component content...</div>; // Replace this with your component UI
// };

// export default CreateUser;

//react.fc is a datatype that is used to represent a react component function
//'src: https://medium.com/@RobertoSilvaZ/when-should-i-use-jsx-element-or-react-fc-29e61eb1e754
// const CreateUser: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("https://webapp-api.vercel.app/api/users");
//         if (!response.ok) {
//           throw new Error("Could not fetch customer");
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     }

//     fetchData(); // Call the function
//   }, []);

//   return (
//     <div>
//     <h1>User Data</h1>
//     <ul>
//       {users.map((user, index) => {
//         console.log(users);

//         return (
//           <li key={index}>
//             <h2>jdjd</h2>
//           </li>
//         );
//       })}
//     </ul>
//   </div>
//   )
// }

// export default CreateUser

// //the handles below are triggerd by the onChange and are using the setUser function to update the userState
//   //They also make a new user object by spreading the previous state and updating only relevant property based on the users input.
//   // const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   setUser((prevUser) => ({
//   //     ...prevUser,
//   //     id: e.target.value,
//   //   }))
//   // }

//   // const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   setUser((prevUser) => ({
//   //     ...prevUser,
//   //     gender: e.target.value,
//   //   }))
//   // }

//   // const handleSport = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   setUser((prevUser) => ({
//   //     ...prevUser,
//   //     sport: e.target.value,
//   //   }))
//   // }

//   // const handleSubmit = () => {
//   //   console.log("New user:", user)
//   // }
//   return (

//     // <div className="flex flex-col items-center">
//     //   <label>Id:
//     //   <input type="text" value={user.id} onChange={handleId} />
//     //   </label>
//     //   <label>Gender:
//     //   <input type="text" value={user.gender} onChange={handleGender}/>
//     //   </label>
//     //   <label>Sport:
//     //   <input type="text" value={user.sport} onChange={handleSport} />
//     //   </label>
//     //   <button onClick={handleSubmit}>Create User</button>
//     // </div>
//   )

// async function fetchSession() {
//   try {
//     const response = await fetch (
//       "https://webapp-api.vercel.app/api/users"
//     )
//     if (!response.ok) {
//       throw new Error("Could not fetch sessions");
//     }
//     const data = await response.json();
//     setSessions(data);
//   } catch (error) {
//     console.log("Error fetching sessions:", error);
//   }
// }

// fetchCustomer();
// fetchSession();