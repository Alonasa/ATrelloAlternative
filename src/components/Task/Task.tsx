import React, {memo, useCallback} from 'react';
import s from '../../Todolist.module.css';
import {Button, Checkbox} from '@mui/material';
import {EditableSpan} from '../EditableSpan';
import {Clear} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import {taskType} from '../../Todolist1';
import {ChangeTaskTitleAC} from '../../state/reducers/TasksReducers/TasksReducer';
import {useDispatch} from 'react-redux';
type TaskPropsType = {
  task: taskType
  tlId: string
  onChangeStatus: (id: string)=>void
  removeTask: (id:string)=>void
}

export const Task = memo(({task,tlId,removeTask,onChangeStatus}:TaskPropsType) => {
  console.log("Task")
  const { id, title, isDone} = task;
  const dispatch = useDispatch();
  
  const onChangeTitleHandler = useCallback((newTitle: string) => {
	dispatch(ChangeTaskTitleAC(tlId, id, newTitle))
  },[dispatch])
  
  return (
	<ListItem
	  sx={{
		padding: '0',
		display: 'flex',
		width: '100%'
	  }} className={isDone ? s.finished : ''}>
	  <Checkbox color={'info'} checked={isDone}
				onChange={() => onChangeStatus(id)}/>
	  <EditableSpan value={title}
					onChange={onChangeTitleHandler}/>
	
	  <Button
		sx={{minWidth: 'fit-content', marginLeft: 'auto'}}
		color={'info'} size={'small'}
		onClick={() => removeTask(id)}><Clear/></Button>
	</ListItem>
  );
})