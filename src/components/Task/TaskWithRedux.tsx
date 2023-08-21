import React, {memo, useCallback} from 'react';
import s from '../../Todolist.module.css';
import {Button, Checkbox} from '@mui/material';
import {EditableSpan} from '../EditableSpan';
import {Clear} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import {taskType} from '../../Todolist1';
import {
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC
} from '../../state/reducers/TasksReducers/TasksReducer';
import {useDispatch} from 'react-redux';

type TaskPropsType = {
  task: taskType
  tlId: string
}

export const TaskWithRedux = memo(({task, tlId}: TaskPropsType) => {
  console.log('Task')
  const {id, title, isDone} = task;
  const dispatch = useDispatch();
  
  const onChangeTitleHandler = useCallback((newTitle: string) => {
	dispatch(ChangeTaskTitleAC(tlId, id, newTitle))
  }, [dispatch])
  
  const changeTaskStatusHandler = useCallback((id: string) => {
	dispatch(ChangeTaskStatusAC(tlId, id))
  }, [dispatch])
  
  const removeTaskHandler = useCallback((id: string) => {
	dispatch(RemoveTaskAC(tlId, id))
  }, [dispatch])
  
  return (
	<ListItem
	  sx={{
		padding: '0',
		display: 'flex',
		width: '100%'
	  }} className={isDone ? s.finished : ''}>
	  <Checkbox color={'info'} checked={isDone}
				onChange={() => changeTaskStatusHandler(id)}/>
	  <EditableSpan value={title}
					onChange={onChangeTitleHandler}/>
	  
	  <Button
		sx={{minWidth: 'fit-content', marginLeft: 'auto'}}
		color={'info'} size={'small'}
		onClick={() => removeTaskHandler(id)}><Clear/></Button>
	</ListItem>
  );
})