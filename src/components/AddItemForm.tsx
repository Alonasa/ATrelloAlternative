import React, {FormEvent, KeyboardEvent, useState} from 'react';
import s from '../Todolist.module.css';
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
  let [title, setTitle] = useState<string>('');
  let [error, setError] = useState<boolean>(false);
  
  
  const addTaskHandler = (title: string) => {
	if (title.trim()) {
	  props.addItem(title)
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
  
  return (
	<div>
	  <input value={title} onInput={(e) => onInputHandler(e)}
			 onKeyPress={(e) => onKeyPressHandler(e)}/>
	  <Button size={'small'} color={'info'} onClick={() => addTaskHandler(title)}><AddIcon/></Button>
	  {error &&
      <p className={s.error}>You can't add empty task</p>}
	</div>
  );
};