import React, {useEffect, useState} from 'react';
import {ResponseType, TodolistsAPI, TodolistType} from '../api/todolists-api';

export default {
  title: 'API'
}

export const GetTodolilsts = () => {
  const [state, setState] = useState<Array<TodolistType> | null>(null)
  
  useEffect(() => {
	TodolistsAPI.getTodolists()
	  .then((res) => {
		  setState(res.data)
		}
	  )
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<TodolistType | null>(null)
  useEffect(() => {
	TodolistsAPI.createTodolist()
	  .then((res) => {
		setState(res.data.data.item)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
  const [state, setState] = useState<ResponseType | null>(null)
  
  useEffect(() => {
	TodolistsAPI.updateTodolist('755fb806-9456-4158-a8a7-3c2f8ac82d80', 'React5611')
	  .then((res) => {
		setState(res.data)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<ResponseType | null>(null)
  
  useEffect(() => {
	TodolistsAPI.deleteTodolist('8457de01-405e-4e05-97a0-2c6960faac32')
	  .then((res) => {
		setState(res.data)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any | null>(null)
  
  useEffect(() => {
	TodolistsAPI.getTasks('607d4742-032c-4c3e-9d63-76b3a40600d5')
	  .then((res) => {
		setState(res.data)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any | null>(null)
  
  useEffect(() => {
	TodolistsAPI.createTask('607d4742-032c-4c3e-9d63-76b3a40600d5', 'New Title')
	  .then((res) => {
		setState(res.data)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any | null>(null)
  
  useEffect(() => {
	TodolistsAPI.updateTask('607d4742-032c-4c3e-9d63-76b3a40600d5', '1da1a1bc-8f53-42e6-a049-5ea0e09cbd4e', 'New Title Added')
	  .then((res) => {
		setState(res.data)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any | null>(null)
  
  useEffect(()=> {
    TodolistsAPI.deleteTask('607d4742-032c-4c3e-9d63-76b3a40600d5', '159c1655-8c46-4c56-8077-45504ad4478a')
	  .then((res)=>{
	    setState(res.data)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}