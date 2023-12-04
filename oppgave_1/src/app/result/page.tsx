import Link from "next/link"

import { AnswerType, ResultAnswer, TaskType, Type, TypeAnswer } from "@/types"

const ResultPage = async () => {
  const response = await fetch("http://localhost:3000/api/restapi", {
    method: "get",
  })
  const result = (await response.json()) as TaskType[]
  console.log("=============result page====================")
  console.log(result.data)
  // console.log(result.data.answers)
  const listAnswers = result?.data.map((ans) => ans.answers)
  //console.log(listAnswers)
  let count = 0

  return (
    <>
      <h1>Results</h1>
      <div className="grid grid-cols-4">
        {result?.data.map((task: TaskType, index: number) => (
          <div key={task.id}>
            <article>
              <h2 className="font-bold">Oppgave tekst: {task.text}</h2>
              <p>Operasjon type: {task.type}</p>
            </article>

            {task.answers?.map((ans: ResultAnswer) => (
              <article key={ans.id}>
                <p>Resultat: {ans.correct === true ? "Riktig" : "Feil"}</p>
                <p>Attempts: {ans.attempts + 1}</p>
                {ans.correct === true ? count++ : ""}
              </article>
            ))}
          </div>
        ))}
      </div>
      <p>
        Slutt resultat: {count} av {listAnswers.length} riktig!
      </p>
      <Link href={"/"}>Start på nytt</Link>
    </>
  )
}

export default ResultPage

/*

     {listAnswers?.map((ans: TypeAnswer) => {
          return (
            <article key={ans.key}>
              <p>{JSON.stringify(ans)}</p>
              <p>id: {ans.operatio}</p>
            </article>
          )
        })}

*/
