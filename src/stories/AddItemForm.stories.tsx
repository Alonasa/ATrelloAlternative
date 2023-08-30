import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {AddItemForm, AddItemFormType} from '../components/AddItemForm';
import React, {KeyboardEvent, useState} from 'react';
import Box from '@mui/material/Box';
import {Button, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const meta: Meta<typeof AddItemForm> = {
  title: 'Example/AddItemForm',
  component: AddItemForm,
  parameters: {
	layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
	addItem: {
	  description: 'Button were clicked'
	}
  },
};


export const AddItemFormStory: Story = {
  args: {
	addItem: action('Click on the button'),
  },
};


const AddItemFormWithError = (props: AddItemFormType) => {
  let [title, setTitle] = useState<string>('');
  let [error, setError] = useState<boolean>(true);
  
  
  const addTaskHandler = (title: string) => {
	if (title.trim()) {
	  props.addItem(title)
	  setTitle('')
	} else {
	  setError(true)
	}
  }
  
  const onInputHandler = (value: string) => {
	if (error) {
	  setError(false)
	}
	setTitle(value)
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	if (e.key === 'Enter') {
	  addTaskHandler(title)
	}
  }
  
  return (
	<Box sx={{display: 'flex', alignItems: 'flex-start', maxWidth: '500px'}}>
	  <TextField type={'text'} size={'small'} sx={{width: '90%'}} value={title}
				 onChange={(e) => onInputHandler(e.currentTarget.value)}
				 onKeyPress={onKeyPressHandler}
				 error={error}
				 helperText={error ? 'You can\'t add empty task' : undefined}
	  />
	  <Button
		sx={{minWidth: 'fit-content'}}
		color={'info'} onClick={() => addTaskHandler(title)}><AddIcon/></Button>
	</Box>
  );
}


export const AddItemFormWithErrorStory: Story = {
  render: () => <AddItemFormWithError addItem={() => 'Error occured'}/>
};


export default meta;
type Story = StoryObj<typeof AddItemForm>;