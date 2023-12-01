//import CreateUser from "@/components/CreateUser";

import { PrismaClient } from "@prisma/client"

import CreateUser from "@/components/CreateUser"
import { Data, User } from "@/types/User"

const prisma = new PrismaClient()

async function fetchUserData(): Promise<User[]> {
  try {
    const response = await fetch("http://localhost:3000/api")
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    const data = (await response.json()) as User[]
    return data
  } catch (error) {
    console.error("Fetching error", error)
    return []
  }
}

export default async function Page() {
  const userData = await fetchUserData()
  console.log(userData)
  return (
    <div className="flex flex-col items-center ">
      <CreateUser />
      <div className="max-w-xl mx-auto my-8 p-4 bg-white rounded shadow hover:bg-indigo-100">
      <h1 className="text-2xl font-bold mb-4 ">User Data</h1>
  <ul className="px-4">
    {userData.data.map((user: User, index: number) => (
      <li
        key={index}
        className="border-2 border-solid border-gray-300 rounded p-4 mb-4"
      >
        <h2 className="text-lg font-bold mb-2 text-blue-900">User ID: {user.id}</h2>
        <p className="text-lg font-bold mb-2">Gender: {user.gender}</p>
        <p className="text-lg font-bold mb-2">Sport: {user.sport}</p>
      </li>
    ))}
  </ul>
      </div>

      {/* <ul className="px-6">
        {userData.data.map((user, index) => (
          <li key={index} >
            
            <p>Heartrate: {user.meta.heartrate}</p>
            <p>Watt: {user.meta.watt}</p>
            <p>Speed: {user.meta.speed} </p>
           
          </li>
        ))}
      </ul> */}
    </div>
  )
}

{
  /* <div>
      <h1>User Data</h1>
      <ul>
        {userData.data.map((user:User , index) => {
          console.log(user)
          return (
            <li key={index}>
              <h2>{user.id}</h2>
            </li>
          )
        })}
      </ul>
    </div> */
}
