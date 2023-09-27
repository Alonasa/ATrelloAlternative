import React, {useCallback, useEffect} from 'react';
import s from './Todolist.module.css';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../components/EditableSpan/EditableSpan';
import {Button} from '@mui/material';
import {Clear} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../app/store';
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC, ChangeTodolistTitleTC, DeleteTodolistTC,
  RemoveTodolistAC
} from '../state/reducers/TodolistsReducer/TodolistsReducer';
import {
  AddTaskTC,
  GetTasksTC
} from '../state/reducers/TasksReducers/TasksReducer';
import {ButtonWithMemo} from '../components/ButtonWithMemo/ButtonWithMemo';
import {Task} from '../components/Task/Task';
import {TaskType} from '../api/todolists-api';
import {RequestStatusType} from '../app/app-reducer';

type PropsType = {
  tlId: string
  entityStatus: RequestStatusType
}

export type TasksType = {
  [key: string]: Array<TaskType>
}

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
  addedDate: string
  order: number
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: PropsType) => {
  const todolists: TodolistsType = useSelector<AppRootStateType, TodolistsType>(state => state.todolists.find((tl) => tl.id === props.tlId) as TodolistsType)
  const dispatch = useAppDispatch();
  const {id: tlId, title, filter} = todolists;
  
  
  useEffect(() => {
	dispatch(GetTasksTC(tlId))
  }, [])
  
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.tlId])
  
  const changeFilterHandler = useCallback((filter: FilterValueType) => {
	dispatch(ChangeTodolistFilterAC(tlId, filter))
  }, [tlId, filter])
  
  const addTask = useCallback((title: string) => {
	dispatch(AddTaskTC(tlId, title))
  }, [tlId, title])
  
  const changeTodolistTitleHandler = (newTitle: string) => {
	dispatch(ChangeTodolistTitleTC(tlId, newTitle))
  }
  
  const removeTodolistHandler = (tlId: string) => {
	dispatch(DeleteTodolistTC(tlId))
  }
  
  if (filter === 'Active') {
	tasks = tasks.filter(t => !t.status)
  }
  if (filter === 'Completed') {
	tasks = tasks.filter(t => t.status)
  }
  
  return (
	<div className={s.todolist}>
	  <h3 className={s.title}>
		<EditableSpan value={title}
					  onChange={changeTodolistTitleHandler}/>
		<Button
		  sx={{minWidth: 'fit-content'}}
		  color={'info'}
		  onClick={() => removeTodolistHandler(tlId)}
		  disabled={props.entityStatus === 'loading'}><Clear/></Button>
	  </h3>
	  <div>
		<AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
	  </div>
	  <ul className={s.list}>
		{tasks?.map(el => {
		  return (
			<Task
			  key={el.id} task={el} todoListId={tlId}
			/>
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