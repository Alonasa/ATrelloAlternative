import React from 'react';

type PropsType = {
  mainTitle: string
  task: taskType[]
  removeTask: (id: number)=> void
}

type taskType = {
  id: number
  title: string
  isDone: boolean
}


export const Todolist = (props: PropsType) => {
  const removeTaskHandler = (id: number) => {
    props.removeTask(id)
  }
  
  return (
	<div>
	  <h3>{props.mainTitle}</h3>
	  <div>
		<input/>
		<button>+</button>
	  </div>
	  <ul>
		{props.task.map(el => {
		  return (
			<li key={el.id}>
			  <input type="checkbox" checked={el.isDone}/>
			  <span>{el.title}</span>
			  <button onClick={()=>removeTaskHandler(el.id)}>x</button>
			</li>
		  )
		})}
	  </ul>
	  <div>
		<button>All</button>
		<button>Active</button>
		<button>Completed</button>
	  </div>
	</div>
  
  )
}