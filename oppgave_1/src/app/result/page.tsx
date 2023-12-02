import { AnswerType, TaskType } from "@/types"

const ResultPage = async () => {
  const response = await fetch("http://localhost:3000/api/restapi", {
    method: "get",
  })
  const result = (await response.json()) as TaskType[]
  console.log("=============result page====================")
  console.log(result.data)
  return (
    <div className="flex flex-col items-center">
      {JSON.stringify(result?.data)}
      <section>
        {result?.data.map((task: TaskType) => {
          return (
            <article key={task.id}>
              <p>{task.id}</p>
              <p>{task.type}</p>
              <p>
                {task.data.split("|").map((da) => {
                  return <span key={`${da}r+${Math.random()}`}>{da} :</span>
                })}
              </p>
              {task?.answers.map((ans: AnswerType) => {
                return ans.answers.map((atm) => {
                  return (
                    <article key={ans.id}>
                      <p>{atm.attempts}</p>
                      <p>Yuup</p>
                    </article>
                  )
                })
              })}
            </article>
          )
        })}
        <p>This is not working well</p>
        {result?.data
          .map((tas) => tas)
          .map((ans) => ans.answers)
          .map((at) => {
            console.log("AT: ")
            console.log(at)
            return (
              <div key={at.id}>
                {at.attempts}
                {at.id}
              </div>
            )
          })}
        <p>done</p>
      </section>
    </div>
  )
}

export default ResultPage
