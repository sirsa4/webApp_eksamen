//import CreateUser from "@/components/CreateUser";

import { PrismaClient } from "@prisma/client"
import Link from "next/link"

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
    <div>
      <div className="flex flex-col items-center">
        <CreateUser />
      </div>
      <div>
      <h1 className="text-2xl font-bold mb-4 text-center ">User Data</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {userData.data.map((user: User, index: number) => (
          <article
            key={index}
            className="border-2 border-solid border-gray-300 m-4 rounded p-4 shadow-md"
          >
            <h2 className="text-lg font-bold mb-2">User ID: {user.userId}</h2>
            <p className="mb-2">Gender: {user.gender}</p>
            <p className="mb-2">Sport: {user.sport}</p>
            <div>
              <Link
                href={`/users/${user.id}`}
                type="submit"
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >Se bruker økter </Link>
              
            </div>
          </article>
        ))}
      </section>
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
