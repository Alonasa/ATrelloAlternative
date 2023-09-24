import React, {ChangeEvent, memo, useCallback} from 'react';
import s from '../../todolist/Todolist.module.css';
import {Button, Checkbox} from '@mui/material';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Clear} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import {
  ChangeTaskTitleTC,
  RemoveTaskTC,
  UpdateTaskTC
} from '../../state/reducers/TasksReducers/TasksReducer';
import {useAppDispatch} from '../../app/store';
import {TaskStatuses, TaskType} from '../../api/todolists-api';

type TaskPropsType = {
  task: TaskType
  todoListId: string
}

export const Task = memo(({task, todoListId}: TaskPropsType) => {
  const {id, title, status} = task;
  const dispatch = useAppDispatch();
  
  const onChangeTitleHandler = useCallback((newTitle: string) => {
	dispatch(ChangeTaskTitleTC(todoListId, id, newTitle))
  }, [todoListId, id])
  
  const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
	dispatch(UpdateTaskTC(todoListId, id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
  }, [todoListId, id])
  
  const removeTaskHandler = useCallback((id: string) => {
	dispatch(RemoveTaskTC(todoListId, id))
  }, [todoListId, id])
  
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