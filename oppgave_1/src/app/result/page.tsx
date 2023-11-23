import { AnswerType, TaskType } from "@/types"

const ResultPage = async () => {
  const response = await fetch("http://localhost:3000/api/restapi", {
    method: "get",
  })
  const result = (await response.json()) as TaskType[]
  console.log(result)
  return (
    <div className="flex flex-col items-center">
      {result?.data.map((task: TaskType) => {
        return (
          <article key={task.id}>
            <p>{task.id}</p>
            <p>{task.type}</p>
            {task.answers.map((ans: AnswerType) => {
              return <p key={ans.id}>{Math.max(ans.attempts)}</p>
            })}
          </article>
        )
      })}
    </div>
  )
}

export default ResultPage
