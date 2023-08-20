import React, {useCallback} from 'react';
import s from './Todolist.module.css';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, Checkbox} from '@mui/material';
import {Clear} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC
} from './state/reducers/TodolistsReducer/TodolistsReducer';
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC
} from './state/reducers/TasksReducers/TasksReducer';

type PropsType = {
  tlId: string
}

export type TasksType = {
  [key: string]: Array<taskType>
}

export type taskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

export const Todolist1 = (props: PropsType) => {
  const todolist: TodolistsType = useSelector<AppRootStateType, TodolistsType>(state => state.todolists.find(tl => tl.id === props.tlId) as TodolistsType)
  const {id:tlId, title, filter} = todolist;
  
 let tasks = useSelector<AppRootStateType, Array<taskType>>(state => state.tasks[props.tlId])
  
  
  const dispatch = useDispatch();
  
  const changeFilterHandler = (filter: FilterValueType) => {
	dispatch(ChangeTodolistFilterAC(tlId, filter))
  }
  
  const changeTaskStatusHandler = (id: string) => {
	dispatch(ChangeTaskStatusAC(tlId, id))
  }
  
  const removeTaskHandler = (id: string) => {
	dispatch(RemoveTaskAC(tlId, id))
  }
  
  const addTask = useCallback((title: string) => {
	dispatch(AddTaskAC(tlId, title))
  }, [dispatch])
  
  const changeTodolistTitleHandler = (newTitle: string) => {
	dispatch(ChangeTodolistTitleAC(tlId, newTitle))
  }
  
  const removeTodolistHandler = (tlId: string) => {
	dispatch(RemoveTodolistAC(tlId))
  }
  
  
  if (filter === 'Active') {
	tasks = tasks.filter(t => !t.isDone)
  }
  if (filter === 'Completed') {
	tasks = tasks.filter(t => t.isDone)
  }
  
  return (
	<div className={s.todolist}>
	  <h3 className={s.title}>
		<EditableSpan value={title}
					  onChange={changeTodolistTitleHandler}/>
		<Button
		  sx={{minWidth: 'fit-content'}}
		  color={'info'}
		  onClick={() => removeTodolistHandler(tlId)}><Clear/></Button>
	  </h3>
	  <div>
		<AddItemForm addItem={addTask}/>
	  </div>
	  <ul className={s.list}>
		{tasks.map(el => {
		  const onChangeTitleHandler = (newTitle: string) => {
			dispatch(ChangeTaskTitleAC(tlId, el.id, newTitle))
		  }
		  
		  return (
			<ListItem
			  sx={{
				padding: '0',
				display: 'flex',
				width: '100%'
			  }} className={el.isDone ? s.finished : ''} key={el.id}>
			  <Checkbox color={'info'} checked={el.isDone}
						onChange={() => changeTaskStatusHandler(el.id)}/>
			  <EditableSpan value={el.title}
							onChange={onChangeTitleHandler}/>
			  
			  <Button
				sx={{minWidth: 'fit-content', marginLeft: 'auto'}}
				color={'info'} size={'small'}
				onClick={() => removeTaskHandler(el.id)}><Clear/></Button>
			</ListItem>
		  )
		})}
	  </ul>
	  <Grid item sx={{
		width: 'calc(100% - 2em)',
		display: 'flex',
		position: 'absolute',
		bottom: '0',
		margin: '1em 0',
	  }}>
		<Button
		  sx={{
			flexGrow: 1, wordWrap: 'break-word',
			overflow: 'hidden', minWidth: 'fit-content'
		  }}
		  size={'small'}
		  color={filter === 'All' ? 'secondary' : 'primary'}
		  onClick={() => changeFilterHandler('All')} variant={'outlined'}>All
		</Button>
		<Button
		  sx={{
			flexGrow: 1, wordWrap: 'break-word',
			overflow: 'hidden'
		  }}
		  size={'small'}
		  variant={'outlined'}
		  color={filter === 'Active' ? 'secondary' : 'primary'}
		  onClick={() => changeFilterHandler('Active')}>Active
		</Button>
		<Button
		  sx={{
			flexGrow: 1, wordWrap: 'break-word',
			overflow: 'hidden'
		  }}
		  size={'small'}
		  variant={'outlined'}
		  color={filter === 'Completed' ? 'secondary' : 'primary'}
		  onClick={() => changeFilterHandler('Completed')}>Completed
		</Button>
	  </Grid>
	</div>
  )
}