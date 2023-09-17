import React, {ChangeEvent, memo, useCallback} from 'react';
import s from '../../Todolist.module.css';
import {Button, Checkbox} from '@mui/material';
import {EditableSpan} from '../EditableSpan';
import {Clear} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import {
  ChangeTaskTitleAC, ChangeTaskTitleTC,
  RemoveTaskTC,
  UpdateTaskTC
} from '../../state/reducers/TasksReducers/TasksReducer';
import {useAppDispatch} from '../../state/store';
import {TaskStatuses, TaskType} from '../../api/todolists-api';

type TaskPropsType = {
  task: TaskType
  tlId: string
}

export const TaskWithRedux = memo(({task, tlId}: TaskPropsType) => {
  const {id, title, status} = task;
  const dispatch = useAppDispatch();
  
  console.log(task)
  
  const onChangeTitleHandler = useCallback((newTitle: string) => {
	dispatch(ChangeTaskTitleTC(tlId, id, newTitle))
  }, [tlId, id])
  
  const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
	dispatch(UpdateTaskTC(tlId, id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
  }, [tlId, id])
  
  const removeTaskHandler = useCallback((id: string) => {
	dispatch(RemoveTaskTC(tlId, id))
  }, [tlId, id])
  
  return (
	<ListItem
	  sx={{
		padding: '0',
		display: 'flex',
		wordBreak: 'break-all',
		width: '100%'
	  }} className={status === 2 ? s.finished : ''}>
	  <Checkbox color={'info'} checked={status > 0}
				onChange={changeTaskStatusHandler}/>
	  <EditableSpan value={title}
					onChange={onChangeTitleHandler}/>
	  
	  <Button
		sx={{minWidth: 'fit-content', marginLeft: 'auto'}}
		color={'info'} size={'small'}
		onClick={() => removeTaskHandler(id)}><Clear/></Button>
	</ListItem>
  );
})