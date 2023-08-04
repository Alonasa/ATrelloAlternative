import React, {FormEvent, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css';

type PropsType = {
  mainTitle: string
  task: taskType[]
  removeTask: (id: string) => void
  addTask: (title: string) => void
  changeFilter: (filter: FilterValueType) => void
  filter: FilterValueType
}

export type taskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = 'All' | 'Active' | 'Completed'


export const Todolist = (props: PropsType) => {
  let [title, setTitle] = useState<string>('');
  let [error, setError] = useState<boolean>(false);
  
  const removeTaskHandler = (id: string) => {
	props.removeTask(id)
  }
  
  const addTaskHandler = (title: string) => {
	if (title.trim()) {
	  props.addTask(title)
	  setTitle('')
	} else {
	  setError(true)
	}
  }
  
  const onInputHandler = (e: FormEvent<HTMLInputElement>) => {
	setError(false)
	setTitle(e.currentTarget.value)
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  	if(e.key === 'Enter'){
  	  addTaskHandler(title)
	}
  }
  
  const changeFilterHandler = (filter: FilterValueType) => {
	props.changeFilter(filter)
  }
  
  return (
	<div>
	  <h3>{props.mainTitle}</h3>
	  <div>
		<input value={title} onInput={(e) => onInputHandler(e)} onKeyPress={(e)=>onKeyPressHandler(e)}/>
		<button onClick={() => addTaskHandler(title)}>+</button>
		{error && <span className={s.error}><br/>You can't add empty task</span>}
	  </div>
	  <ul>
		{props.task.map(el => {
		  return (
			<li key={el.id}>
			  <input type="checkbox" checked={el.isDone}/>
			  <span>{el.title}</span>
			  <button onClick={() => removeTaskHandler(el.id)}>x</button>
			</li>
		  )
		})}
	  </ul>
	  <div>
		<button className={props.filter === 'All'? `${s.button} ${s.active}`: s.button} onClick={() => changeFilterHandler('All')}>All</button>
		<button className={props.filter === 'Active'? `${s.button} ${s.active}`: s.button} onClick={() => changeFilterHandler('Active')}>Active</button>
		<button className={props.filter === 'Completed'? `${s.button} ${s.active}`: s.button} onClick={() => changeFilterHandler('Completed')}>Completed
		</button>
	  </div>
	</div>
  
  )
}