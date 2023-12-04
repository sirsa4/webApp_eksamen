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
// SRC: kilde:https://nerdcave.com/tailwind-cheat-sheet
  return (
    <>
     <div className=" flex h-screen w-full flex-col items-center justify-center mb-4n">
  <div className=" rounded-lg border border-gray-300 p-4">
    <h1 className="text-lg font-bold mb-4 text-center">Results</h1>
   
      {result?.data.map((task: TaskType, index: number) => (
        <div key={task.id}>
          <article className="  items-center justify-centerrounded-lg border rounded-lg border-gray-300 p-4 mb-4">
            <h2 className="font-bold  ">Oppgave tekst: {task.text}</h2>
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
    <div className=" grid items-center  justify-center mt-4">
    <p> Slutt resultat: {count} av {listAnswers.length} riktig!</p>
    
      <Link className=" text-center focus:shadow-outline rounded-lg bg-green-500 px-4 py-1  font-bold text-white hover:bg-green-700 focus:outline-none" href={"/"}>
        Start på nytt
      </Link>
    </div>
    </div>
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
