import React, {useEffect, useState} from 'react';
import {TodolistsType} from '../Todolist1';
import {TodolistsAPI} from '../api/todolists-api';

export default {
  title: 'API'
}

export const GetTodolilsts = () => {
  const [state, setState] = useState<any | null>(null)
  
  useEffect(() => {
	TodolistsAPI.getTodolists()
	  .then((res: any) => {
		  setState(res)
		}
	  )
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<TodolistsType | null>(null)
  useEffect(() => {
    TodolistsAPI.createTodolist()
	  .then((res)=> {
			setState(res.data)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
  const [state, setState] = useState<TodolistsType | null>(null)
  
  useEffect(() => {
	TodolistsAPI.updateTodolist('896169ef-9b8b-47d5-a393-d1ed276adfea', 'React11')
	  .then((res)=> {
	    setState(res.data)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<TodolistsType | null>(null)
  
  useEffect(() => {
    TodolistsAPI.deleteTodolist('03276001-62c4-40c2-a443-4be599d637ca')
	  .then((res)=>{
	    setState(res.data)
	  })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}