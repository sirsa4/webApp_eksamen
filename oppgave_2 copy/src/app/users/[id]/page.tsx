import Link from "next/link"
import { NextRequest } from "next/server"

import { Activity, CompetitionType, User } from "@/types/User"

const Userpage = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(`http://localhost:3000/api/${params.id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const json = (await response.json()) as User
  const result = json?.data as User
  console.log("================result==================")
  console.log(result.competitions)
  console.log("id: " + params.id)

  return (
    <div className="grid space-y-8 text-center">
      <div className="m-4 my-8 inline-grid items-center rounded border-2 border-solid border-gray-100 p-4 shadow-md">
        <section className="m-4 rounded bg-blue-200 p-4 shadow-md">
          <header>
            <h1 className="mb-4 text-center text-2xl font-bold">
              User page for
            </h1>
            <h2 className="mb-2 text-lg font-bold">Bruker: {result?.userId}</h2>
          </header>
          <div>
            <p className="mb-2 text-lg font-bold">ID: {params?.id}</p>
            <p className="mb-2 text-lg font-bold">Gender: {result?.gender}</p>
            <p className="mb-2 text-lg font-bold">Sport: {result?.sport}</p>
          </div>
          <div>
            <Link
              href={`/users/competition?user=${result.id}`}
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Create competition
            </Link>
            <Link
              href={`/users/newActivity?user=${result.id}`}
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Create activity
            </Link>
          </div>
        </section>

        <div className="activity-box m-4 rounded border-2 border-solid border-gray-100 p-4  shadow-md ">
          Activities
          {result.activities?.map((ac: Activity) => (
            <div className="activity-box border-gray-00 m-4 rounded border-2 border-solid bg-blue-200 p-4 shadow-md">
              <div key={ac.id}>
                <h4>Date: {ac.date}</h4>
                <p>ID: {ac.id}</p>
                <p>Sport: {ac.sport}</p>
                <div>
                  <p>Tags: </p>
                  {Array.isArray(ac.tags)
                    ? ac.tags.map((ta) => (
                        <span key={`${ta}+${Math.random() + 1}`}>{ta}</span>
                      ))
                    : "no tags"}
                  {ac.tags
                    ?.split(",")
                    .map((tag: string) => (
                      <span key={`${tag}+${Math.random}`}>{tag},</span>
                    ))}
                </div>
              </div>
              {ac.intervals?.map((int) => (
                <div
                  className="activity-box m-4 rounded border-2  border-solid border-gray-500 p-4 shadow-md"
                  key={int.id}
                >
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
        <div>
          <h1>Competitions</h1>
          {result?.competitions.map((co: CompetitionType) => {
            return (
              <article key={co?.id}>
                <p>Name: {co?.name}</p>
                <p>Location: {co.location}</p>
                <p>Date: {co?.date}</p>
                <p>Competition type: {co?.sport}</p>
                <p>Goal: {co?.goal}</p>
                <p>Priority: {co.priority}</p>
                <p>Comment: {co?.comment}</p>
              </article>
            )
          })}
        </div>
        <div className="items-center justify-center">
          <Link
            href={"/users"}
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Gå tilbake
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Userpage
