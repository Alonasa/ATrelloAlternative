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