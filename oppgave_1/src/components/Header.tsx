import { TaskType } from "@/types"

export default function Header({
  tasks,
  count,
  attempts,
}: {
  tasks: TaskType
  count: number
  attempts: number
}) {
  return (
    <section className="flex justify-between gap-5">
      <p>Oppgave 1</p>
      <p>
        Forsøk {attempts}/3 {}
      </p>
    </section>
  )
}

/*
<p>
        Oppgave {tasks?.indexOf(tasks[count])}/{tasks.length - 1}
      </p>
*/
