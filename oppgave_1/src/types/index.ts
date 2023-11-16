export type TaskType = {
  id: string
  text: string
  type: "add" | "divide" | "multiply" | "subtract"
  num1: number
  num2: number
}

export type Type = "add" | "subtract" | "multiply" | "divide"
