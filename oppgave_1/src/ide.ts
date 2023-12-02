const answers = {
  [taskId]: {
    correct: false,
    tries: 3,
    operation: 'add'
  },
  [taskId]: {
    correct: true,
    tries: 1,
    operation: 'subtraction'
  },
  [taskId]: {
    correct: true,
    tries: 2,
    operation: 'subtraction'
  },
}


const Challenge = {
  id: '123',
  tasks: [
    {
      id: '123',
      question: '1 + 1',
      answer: 2,
    },
    {
      id: '345',
      question: '2 / 2',
      answer: 1,
    },
    {
      id: '365',
      question: '1 * 1',
      answer: 1,
    },
  ]
  
}



const Tasks = ({ tasks }) => {
  const {current, progress, validate, answers, updateAnswer} = useProgress(tasks)

  const handleAnswer = (event, taskId) => {
    event.preventDefault()
    const value = event.elements[0].value;
    if (validate(value)) return progress();
    return updateAnswer(() = tries + 1)
  }

  return (
    <div>
        <Progress next={() => progress('next')} prev={() => progress('prev')} />
        <Task key={current.id} {...current} send={handleAnswer} />
        <Footer result={answers[current.id]} />
    </div>
  );
};

const Task = ({ send }) => {
  
  return (
    <form onSubmit={send}>
      <label>Svar</label>
      <input type="number" />
      <button>Send</button>
    </form>
  );
};