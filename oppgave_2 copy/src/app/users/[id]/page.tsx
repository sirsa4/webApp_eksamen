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
    <>
      <div>
        <section>
          <header>
            <h2>User page for: {result?.userId}</h2>
          </header>
          <div>
            <p>ID: {params?.id}</p>
            <p>Gender: {result?.gender}</p>
            <p>Sport: {result?.sport}</p>
          </div>
        </section>
        <section>
          <header>
            <h3>Activities</h3>
          </header>
          {result.activities?.map((ac: Activity) => {
            return (
              <div key={ac.id}>
                <h4>Date: {ac.date}</h4>
                <p>ID: {ac.id}</p>
                <p>Sport: {ac.sport}</p>
                <div>
                  <span>Tags: </span>
                  {Array.isArray(ac.tags)
                    ? ac.tags.map((ta) => {
                        return (
                          <span key={`${ta}+${Math.random() + 1}`}>
                            dsd{ta}
                          </span>
                        )
                      })
                    : "no tags"}
                  {ac.tags?.split(",").map((tag: string) => {
                    return <span key={`${tag}+${Math.random}`}>{tag},</span>
                  })}
                </div>
                {ac.intervals?.map((int) => {
                  return (
                    <div key={int.id}>
                      <header>
                        <h5>ID: {int.id}</h5>
                      </header>
                      <div>
                        <p>Duration: {int.duration}</p>
                        <p>Intensity: {int.intensity}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </section>
      </div>
      <Link href={"/users"}>Gå tilbake</Link>
    </>
  )
}

export default Userpage
