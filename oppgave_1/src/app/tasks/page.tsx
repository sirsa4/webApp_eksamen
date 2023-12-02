import Header from "@/components/Header"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import { TaskType } from "@/types"

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/restapi", {
    method: "get",
  })
  const result = (await response.json()) as TaskType[]
  console.log("===========Tasks at page lvl============")
  console.log(result)
  console.log()

  return (
    <main className="flex flex-col items-center">
      {JSON.stringify(result.data)}
      <h3>Tasks own page</h3>
      <Tasks allTasks={result.data} />
    </main>
  )
}

/*
 {result.data.map((task: TaskType) => {
        return (
          <article key={task.id}>
            <p>{task.text}</p>
            <p>{task.type}</p>
            <p>{task.data}</p>
          </article>
        )
      })}
*/
