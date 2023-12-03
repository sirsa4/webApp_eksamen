export type TaskType = {
  id: string
  text: string
  type: "add" | "divide" | "multiply" | "subtract"
  data: "num1 | num2"
  answer?: string
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
    operation?: string
    correct?: boolean
  }[]
}
export type TypeAnswer = {
  key: string
  attempts: number
  operation?: string
  correct?: boolean
}
