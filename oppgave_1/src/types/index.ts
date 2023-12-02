export type TaskType = {
  id: string
  text: string
  type: "add" | "divide" | "multiply" | "subtract"
  data: "num1 | num2"
  answers?: AnswerType[]
}

export type Type = "add" | "subtract" | "multiply" | "divide"

export type DataType = {
  id: string
  answers: [{ attempts: number }]
}

export type AnswerType = {
  id: string
  answers: {
    attempts: number
  }[]
}
export type TypeAnswer = {
  key: string
  attempts: number
}
