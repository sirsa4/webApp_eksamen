import Link from "next/link"
import { NextRequest } from "next/server"

import { Activity, User } from "@/types/User"

const Userpage = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(`http://localhost:3000/api/${params.id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const json = (await response.json()) as User
  const result = json?.data as User
  console.log(result)
  console.log("id: " + params.id)

  return (
    <div className="grid space-y-8 text-center">
  <div className="inline-grid items-center my-8 border-2 border-solid border-gray-100 m-4 rounded p-4 shadow-md">

    <section className="m-4 rounded p-4 shadow-md bg-blue-200">
      <header>
        <h1 className="text-2xl font-bold mb-4 text-center">User page for</h1>
        <h2 className="mb-2 text-lg font-bold">Bruker: {result?.userId}</h2>
      </header>
      <div>
        <p className="mb-2 text-lg font-bold">ID: {params?.id}</p>
        <p className="mb-2 text-lg font-bold">Gender: {result?.gender}</p>
        <p className="mb-2 text-lg font-bold">Sport: {result?.sport}</p>
      </div>
    </section>

    <div className="activity-box border-2 border-solid border-gray-100 m-4 rounded p-4  shadow-md "  > Activities
      {result.activities?.map((ac: Activity) => (
        <div className="activity-box border-2 border-solid border-gray-00 m-4 rounded p-4 shadow-md bg-blue-200" >
        <div  key={ac.id}>
          <h4>Date: {ac.date}</h4>
          <p>ID: {ac.id}</p>
          <p>Sport: {ac.sport}</p>
          <div>
            <p>Tags: </p>
            {Array.isArray(ac.tags) ? (
              ac.tags.map((ta) => (
                <span key={`${ta}+${Math.random() + 1}`}>{ta}</span>
              ))
            ) : (
              "no tags"
            )}
            {ac.tags?.split(",").map((tag: string) => (
              <span  key={`${tag}+${Math.random}`}>{tag},</span>
            ))}
            </div>
          </div>
          {ac.intervals?.map((int) => (
            <div className="activity-box border-2 border-solid border-gray-500  m-4 rounded p-4 shadow-md" key={int.id}>
              <header>
                <h5>ID: {int.id}</h5>
              </header>
              <div>
                <p>Duration: {int.duration}</p>
                <p>Intensity: {int.intensity}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>

    <div className="items-center justify-center">
      <Link
        href={"/users"}
        type="submit"
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none text-center"
      >
        Gå tilbake
      </Link>
    </div>
  </div>
</div>

  )
}

export default Userpage