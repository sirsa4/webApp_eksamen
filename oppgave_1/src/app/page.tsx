import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import { TaskType } from "@/types"

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/restapi", {
    method: "get",
  })
  const result = (await response.json()) as TaskType

  return (
    <main>
      {JSON.stringify(result)}
      <Header />
      <Tasks>
        <Answer />
      </Tasks>
      <Task />
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
      <Progress tasks={result} />
    </main>
  )
}
