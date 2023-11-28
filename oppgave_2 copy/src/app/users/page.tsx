//import CreateUser from "@/components/CreateUser";


import CreateUser from "@/components/CreateUser"
import { Data, User } from "@/types/User"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

async function fetchUserData(): Promise<User[]> {
  try {
    const response = await fetch("https://webapp-api.vercel.app/api/users")
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    const data: User[] = await response.json()
    return data
  } catch (error) {
    console.error("Fetching error", error)
    return []
  }
}

 export default async function Page() {
  const userData = await fetchUserData();
  
  return (
    <div>
      <div className="flex flex-col items-center">
      <CreateUser/>
      </div>
      <h1>User Data</h1>
      <ul className="px-6">
        {userData.data.map((user, index) => (
          <li key={index} className="border-solid border-2 border-red-500">
            <h2>User ID: {user.id}</h2>
            <p>Gender: {user.gender}</p>
            <p>Sport: {user.sport}</p>
            
           
          </li>
        ))}
      </ul>

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



  

{/* <div>
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
    </div> */}