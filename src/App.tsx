import React, {useState} from 'react';
import './App.css';
import {FilterValueType, TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';


type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
}

function App() {
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
  
  
  const removeTask = (tlId: string, id: string) => {
    setTasks({...tasks, [tlId]: [...tasks[tlId].filter(t => t.id !== id)]})
  }
  
  const changeFilter = (tlId: string, filter: FilterValueType) => {
    setTodolists(todolists.map(tl => tl.id === tlId ? {...tl, filter} : tl))
  }
  
  const addTask = (tlId: string, title: string) => {
    setTasks({
      ...tasks,
      [tlId]: [{id: v1(), title: title, isDone: false}, ...tasks[tlId]]
    })
  }
  
  const changeTaskStatus = (tlId: string, id: string) => {
    setTasks({
      ...tasks,
      [tlId]: tasks[tlId].map(t => t.id === id ? {...t, isDone: !t.isDone} : t)
    })
  }
  
  const addTodolist = (title: string) => {
    let id = v1();
    setTodolists([{id: id, title: title, filter: 'All'}, ...todolists]);
    setTasks({[id]: [], ...tasks})
  }
  
  const changeTitle = (tlId: string, id: string, newTitle: string) => {
    if (newTitle.trim()) {
      setTasks({
        ...tasks,
        [tlId]: tasks[tlId].map(t => t.id === id ? {...t, title: newTitle} : t)
      })
    }
  }
  
  const changeTodolistTitle = (tlId: string, newTitle: string) => {
    setTodolists(todolists.map(t=> t.id == tlId ? {...t, title: newTitle} : t))
  }
  
  
  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {todolists.map(tl => {
        let tasksCopy = tasks[tl.id];
        if (tl.filter === 'Active') {
          tasksCopy = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'Completed') {
          tasksCopy = tasks[tl.id].filter(t => t.isDone)
        }
        
        return (
          <Todolist
            key={tl.id}
            tlId={tl.id}
            mainTitle={tl.title}
            task={tasksCopy}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            filter={tl.filter}
            changeTaskStatus={changeTaskStatus}
            changeTitle={changeTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        )
      })}
    </div>
  );
}

export default App;
