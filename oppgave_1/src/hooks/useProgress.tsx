import { useEffect, useState } from "react"

import { answerList, calculate } from "@/lib/utils"
import { type TaskType } from "@/types"

export function useProgress(allTasks: TaskType[]) {
  const [tasks, setTasks] = useState<TaskType[]>(allTasks)
  //list of states used in program
  const [count, setCount] = useState(0)
  const current = tasks[count] as TaskType
  const [input, setInput] = useState("")
  const [lastTask, setLastTask] = useState(false)
  const [answer, setAnswer] = useState(0)
  const [score, setScore] = useState(0)
  const data = current?.data.split("|")
  const [attempts, setAttempts] = useState(0)
  const [operation, setOperation] = useState("")
  const [toggleAnswer, setToggleAnswer] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [counter, setCounter] = useState(1)

  //function to go next task
  const next = () => {
    console.log("next: useProgress")
    if (count < tasks.length - 1) {
      setCount((prevCount) => prevCount + 1)
    } else {
      setCount(0)
    }
    if (calculate(current, data) === answer) {
      setScore((prev) => prev + 1)
    }
    console.log("=============useProgress================")
    /*
    answerList.set(current.id, {
      attempts: attempts,
      operation: tasks[count].type,
      isCorrect: isCorrect,
    })
    console.log(answerList)
    */
    setAttempts(0)
    //hide showing answer when next task button is clicked
    setToggleAnswer(false)
    //remove "bra jobbet" from ui when going to next task after user solved current task correctly
    setIsCorrect(false)
    setCounter((prev) => prev + 1)
    console.log("current count: " + counter)
    console.log("tasks length: " + tasks.length)
    if (counter === tasks.length - 1 || counter > tasks.length - 1) {
      setLastTask(true)
    } else {
      // setLastTask(false)
    }
  }
  //function to go previous task
  const prev = () => {
    console.log("prev: useProgress")
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
    } else {
      setCount(0)
    }
    setAttempts(0)
    //also hide answer when previous task button is clicked
    setToggleAnswer(false)
    //also remove "bra jobbet" from ui when going user goes back to prev task
  }
  //function to check which allows user to see answer
  const checkAnswer = () => {
    //console.log("checking check")
    setToggleAnswer((prev) => !prev)
  }

  const validate = () => {
    if (input) {
      const calc = calculate(current, data)
      console.log("====validate2=====")
      let correct = false

      setAttempts((prev: number) => prev + 1)
      console.log("Attempts: " + attempts)

      if (calc === parseFloat(input)) {
        // console.log(`Answer is: ${calc}`)
        setIsCorrect(true)
        //  setCorrect(true)
        correct = true
        console.log(`calc: ${calc} | input: ${parseFloat(input)}`)
      } else {
        setIsCorrect(false)
        //  setCorrect(false)
        correct = false
      }
      // console.log(attempts)
      setInput("")
      // setOperation(current.type)
      console.log(attempts)
      answerList.set(current.id, {
        attempts: attempts,
        operation: tasks[count].type,
        correct: correct,
      })
      console.log(answerList)
    }
  }

  return {
    count,
    current,
    input,
    setInput,
    lastTask,
    data,
    next,
    prev,
    score,
    answer,
    setAnswer,
    tasks,
    attempts,
    setAttempts,
    toggleAnswer,
    checkAnswer,
    isCorrect,
    setIsCorrect,
    operation,
    setOperation,
    validate,
  }
}

/*
 count,
    current,
    lastTask,
    data,
    next,
    prev,
    score,
    answer,
    setAnswer,
*/
