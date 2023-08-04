import React, {useState} from 'react';
import './App.css';
import {FilterValueType, taskType, Todolist} from './Todolist';
import {v1} from 'uuid';


function App() {
  const [filter, setFilter] = useState<FilterValueType>('All');
  
  let [tasks, setTasks] = useState<taskType[]>([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false}
  ])
  
  
  const removeTask = (id: string) => {
    setTasks([...tasks.filter(t => t.id !== id)])
  }
  
  let tasksCopy = tasks;
  if (filter === 'Active') {
    tasksCopy = tasks.filter(t => !t.isDone)
  }
  if (filter === 'Completed') {
    tasksCopy = tasks.filter(t => t.isDone)
  }
  
  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter)
  }
  
  const addTask = (title: string) => {
    setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
  }
  
  return (
    <div className="App">
      <Todolist mainTitle={'What to learn'} task={tasksCopy}
                removeTask={removeTask} changeFilter={changeFilter} addTask={addTask} filter={filter}/>
    </div>
  );
}

export default App;
