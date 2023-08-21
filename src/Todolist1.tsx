import React, {useCallback} from 'react';
import s from './Todolist.module.css';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button} from '@mui/material';
import {Clear} from '@mui/icons-material';
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
import {ButtonWithMemo} from './components/ButtonWithMemo/ButtonWithMemo';
import {Task} from './components/Task/Task';

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
  console.log('TODOLIST')
  const todolist: TodolistsType = useSelector<AppRootStateType, TodolistsType>(state => state.todolists.find(tl => tl.id === props.tlId) as TodolistsType)
  const {id: tlId, title, filter} = todolist;
  
  let tasks = useSelector<AppRootStateType, Array<taskType>>(state => state.tasks[props.tlId])
  
  
  const dispatch = useDispatch();
  
  const changeFilterHandler = (filter: FilterValueType) => {
	dispatch(ChangeTodolistFilterAC(tlId, filter))
  }
  
  const changeTaskStatusHandler = useCallback((id: string) => {
	dispatch(ChangeTaskStatusAC(tlId, id))
  }, [dispatch])
  
  const removeTaskHandler = useCallback((id: string) => {
	dispatch(RemoveTaskAC(tlId, id))
  }, [dispatch])
  
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
		  
		  
		  return (
			<Task key={el.id} task={el} tlId={tlId} onChangeStatus={changeTaskStatusHandler}
				  removeTask={removeTaskHandler}/>
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
		<ButtonWithMemo
		  title={'All'}
		  color={filter === 'All' ? 'secondary' : 'primary'}
		  variant={'outlined'} size={'small'}
		  onClick={() => changeFilterHandler('All')}
		/>
		<ButtonWithMemo
		  title={'Active'}
		  color={filter === 'Active' ? 'secondary' : 'primary'}
		  variant={'outlined'} size={'small'}
		  onClick={() => changeFilterHandler('Active')}
		/>
		<ButtonWithMemo
		  title={'Completed'}
		  color={filter === 'Completed' ? 'secondary' : 'primary'}
		  variant={'outlined'} size={'small'}
		  onClick={() => changeFilterHandler('Completed')}
		/>
	  </Grid>
	</div>
  )
}