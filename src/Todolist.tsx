import React, {FormEvent, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css';

type PropsType = {
  mainTitle: string
  tlId: string
  task: taskType[]
  removeTask: (tlId: string, id: string) => void
  addTask: (tlId: string, title: string) => void
  changeFilter: (filter: FilterValueType) => void
  filter: FilterValueType
  changeTaskStatus: (tlId: string, id: string) => void
}

export type taskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [key: string]: Array<taskType>
}

export type FilterValueType = 'All' | 'Active' | 'Completed'


export const Todolist = (props: PropsType) => {
  let [title, setTitle] = useState<string>('');
  let [error, setError] = useState<boolean>(false);
  
  const removeTaskHandler = (id: string) => {
	props.removeTask(props.tlId, id)
  }
  
  const addTaskHandler = (title: string) => {
	if (title.trim()) {
	  props.addTask(props.tlId,title)
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
	if (e.key === 'Enter') {
	  addTaskHandler(title)
	}
  }
  
  const changeFilterHandler = (filter: FilterValueType) => {
	props.changeFilter(filter)
  }
  
  const changeTaskStatusHandler = (id: string) => {
	props.changeTaskStatus(props.tlId, id)
  }
  
  return (
	<div>
	  <h3>{props.mainTitle}</h3>
	  <div>
		<input value={title} onInput={(e) => onInputHandler(e)}
			   onKeyPress={(e) => onKeyPressHandler(e)}/>
		<button onClick={() => addTaskHandler(title)}>+</button>
		{error &&
        <p className={s.error}>You can't add empty task</p>}
	  </div>
	  <ul className={s.list}>
		{props.task.map(el => {
		  return (
			<li className={el.isDone ? s.finished : ''} key={el.id}>
			  <article><input type="checkbox" checked={el.isDone}
					   onChange={() => changeTaskStatusHandler(el.id)}/>
				<span>{el.title}</span>
			  </article>
			  <button onClick={() => removeTaskHandler(el.id)}>x</button>
			</li>
		  )
		})}
	  </ul>
	  <div>
		<button
		  className={props.filter === 'All' ? `${s.button} ${s.active}` : s.button}
		  onClick={() => changeFilterHandler('All')}>All
		</button>
		<button
		  className={props.filter === 'Active' ? `${s.button} ${s.active}` : s.button}
		  onClick={() => changeFilterHandler('Active')}>Active
		</button>
		<button
		  className={props.filter === 'Completed' ? `${s.button} ${s.active}` : s.button}
		  onClick={() => changeFilterHandler('Completed')}>Completed
		</button>
	  </div>
	</div>
  
  )
}