export type TaskType = {
  id: string
  text: string
  type: "add" | "divide" | "multiply" | "subtract"
  data: "num1 | num2"
}

export type Type = "add" | "subtract" | "multiply" | "divide"
