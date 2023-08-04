import React, {useState} from 'react';
import './App.css';
import {FilterValueType, taskType, Todolist} from './Todolist';



function App() {
  const [filter, setFilter]=useState<FilterValueType>('All');
  
  let [tasks, setTasks] = useState<taskType[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
  ])
  
  
  const removeTask = (id: number) => {
    setTasks([...tasks.filter(t => t.id!==id)])
  }
  
  let tasksCopy = tasks;
  if(filter === 'Active'){
    tasksCopy = tasks.filter(t=> !t.isDone)
  }
  if(filter === 'Completed'){
    tasksCopy = tasks.filter(t=>t.isDone)
  }
  
  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter)
  }
  
    return (
        <div className="App">
            <Todolist mainTitle={'What to learn'} task={tasksCopy} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
