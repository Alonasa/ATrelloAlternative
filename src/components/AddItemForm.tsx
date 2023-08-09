import React, {FormEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

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
	<Box sx={{display: 'flex', alignItems: 'flex-start'}}>
	  <TextField type={'text'} size={'small'} value={title}
				 onInput={onInputHandler}
				 onKeyPress={onKeyPressHandler} error={error}
				 helperText={error ? 'You can\'t add empty task' : undefined}/>
	  <Button
		sx={{minWidth: 'fit-content'}}
		color={'info'} onClick={() => addTaskHandler(title)}><AddIcon/></Button>
	</Box>
  );
};