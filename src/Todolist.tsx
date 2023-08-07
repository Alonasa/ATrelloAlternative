import React from 'react';
import s from './Todolist.module.css';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';

type PropsType = {
  mainTitle: string
  tlId: string
  task: taskType[]
  removeTask: (tlId: string, id: string) => void
  addTask: (tlId: string, title: string) => void
  changeFilter: (tlId: string, filter: FilterValueType) => void
  filter: FilterValueType
  changeTaskStatus: (tlId: string, id: string) => void
  changeTitle: (tlId: string, id: string, newTitle: string) => void
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
  
  const changeFilterHandler = (filter: FilterValueType) => {
	props.changeFilter(props.tlId, filter)
  }
  
  const changeTaskStatusHandler = (id: string) => {
	props.changeTaskStatus(props.tlId, id)
  }
  
  const removeTaskHandler = (id: string) => {
	props.removeTask(props.tlId, id)
  }
  
  const addTask = (title: string) => {
	props.addTask(props.tlId, title)
  }
  
  return (
	<div>
	  <h3>{props.mainTitle}</h3>
	  <div>
		<AddItemForm addItem={addTask}/>
	  </div>
	  <ul className={s.list}>
		{props.task.map(el => {
		  const onChangeTitleHandler = (newTitle: string) => {
			props.changeTitle(props.tlId, el.id, newTitle)
		  }
		  
		  return (
			<li className={el.isDone ? s.finished : ''} key={el.id}>
			  <article><input type="checkbox" checked={el.isDone}
							  onChange={() => changeTaskStatusHandler(el.id)}/>
				<EditableSpan value={el.title}
							  onChange={onChangeTitleHandler}/>
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