import React from 'react';
import s from './Todolist.module.css';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, Checkbox, Input} from '@mui/material';
import {Clear} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem'

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
  changeTodolistTitle: (tlId: string, newTitle: string) => void
  removeTodolist: (tlId: string) => void
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
  
  const changeTodolistTitleHandler = (newTitle: string) => {
	props.changeTodolistTitle(props.tlId, newTitle)
  }
  
  const removeTodolistHandler = (tlId: string) => {
    props.removeTodolist(tlId)
  }
  
  return (
	<div className={s.todolist}>
	  <h3 className={s.title}>
		<EditableSpan value={props.mainTitle}
					  onChange={changeTodolistTitleHandler}/>
		<Button color={'info'} onClick={() => removeTodolistHandler(props.tlId)}><Clear/></Button>
	  </h3>
	  <div>
		<AddItemForm addItem={addTask}/>
	  </div>
	  <ul className={s.list}>
		{props.task.map(el => {
		  const onChangeTitleHandler = (newTitle: string) => {
			props.changeTitle(props.tlId, el.id, newTitle)
		  }
		  
		  return (
			<ListItem sx={{padding: '0', display: 'flex', justifyContent: 'space-between'}} className={el.isDone ? s.finished : ''} key={el.id}>
			  <article><Checkbox color={'info'} checked={el.isDone}
							  onChange={() => changeTaskStatusHandler(el.id)}/>
				<EditableSpan value={el.title}
							  onChange={onChangeTitleHandler}/>
			  </article>
			  <Button color={'info'} size={'small'} onClick={() => removeTaskHandler(el.id)}><Clear/></Button>
			</ListItem>
		  )
		})}
	  </ul>
	  <div>
		<Button
		  size={'small'}
		  color={props.filter === 'All' ? 'secondary' : 'primary' }
		  onClick={() => changeFilterHandler('All')} variant={'outlined'}>All
		</Button>
		<Button
		  size={'small'}
		  variant={'outlined'}
		  color={props.filter === 'Active' ? 'secondary' : 'primary' }
		  onClick={() => changeFilterHandler('Active')}>Active
		</Button>
		<Button
		  size={'small'}
		  variant={'outlined'}
		  color={props.filter === 'Completed' ? 'secondary' : 'primary' }
		  onClick={() => changeFilterHandler('Completed')}>Completed
		</Button>
	  </div>
	</div>
  
  )
}