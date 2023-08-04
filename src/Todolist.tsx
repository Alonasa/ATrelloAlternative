import React from 'react';

type PropsType = {
  mainTitle: string
  task: taskType[]
  removeTask: (id: number)=> void
  changeFilter: (filter: FilterValueType)=>void
}

export type taskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValueType = 'All' |'Active'|'Completed'


export const Todolist = (props: PropsType) => {
  const removeTaskHandler = (id: number) => {
    props.removeTask(id)
  }
  
  const changeFilterHandler = (filter: FilterValueType) => {
  	props.changeFilter(filter)
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
		<button onClick={()=>changeFilterHandler('All')}>All</button>
		<button onClick={()=>changeFilterHandler('Active')}>Active</button>
		<button onClick={()=>changeFilterHandler('Completed')}>Completed</button>
	  </div>
	</div>
  
  )
}