import React, {useState} from 'react';
import './App.css';
import {FilterValueType, TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';


type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
}

function App() {
  const [filter, setFilter] = useState<FilterValueType>('All');
  //
  // let [tasks, setTasks] = useState<taskType[]>([
  //   {id: v1(), title: 'HTML&CSS', isDone: true},
  //   {id: v1(), title: 'JS', isDone: true},
  //   {id: v1(), title: 'ReactJS', isDone: false}
  // ])
  
  
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
  ])
  
  let [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: 'HTML&CSS2', isDone: true},
      {id: v1(), title: 'JS2', isDone: true},
      {id: v1(), title: 'ReactJS2', isDone: false},
      {id: v1(), title: 'Rest API2', isDone: false},
      {id: v1(), title: 'GraphQL2', isDone: false},
    ]
  });
  
  
  const removeTask = (id: string) => {
    //setTasks([...tasks.filter(t => t.id !== id)])
  }
  
  const changeFilter = (filter: FilterValueType) => {
    // setFilter(filter)
  }
  
  const addTask = (tlId: string, title: string) => {
    setTasks({...tasks, [tlId]:[{id: v1(), title: title, isDone: false}, ...tasks[tlId]]})
  }
  
  const changeTaskStatus = (id: string) => {
    //setTasks(tasks.map(t => t.id === id ? {...t, isDone: !t.isDone} : t))
  }
  
  return (
    <div className="App">
      {todolists.map(tl => {
        let tasksCopy = tasks[tl.id];
        if (filter === 'Active') {
          tasksCopy = tasks[tl.id].filter(t => !t.isDone)
        }
        if (filter === 'Completed') {
          tasksCopy = tasks[tl.id].filter(t => t.isDone)
        }
        
        return (
          <Todolist
            key={tl.id}
            tlId={tl.id}
            mainTitle={'What to learn'}
            task={tasksCopy}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            filter={tl.filter}
            changeTaskStatus={changeTaskStatus}/>
        )
      })}
    </div>
  );
}

export default App;
