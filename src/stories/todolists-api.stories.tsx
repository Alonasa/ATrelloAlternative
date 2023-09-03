import React, {useEffect, useState} from 'react';
import {TodolistsType} from '../Todolist1';

export default {
  title: 'API'
}

export const GetTodolilsts = ()=>{
  const [state, setState] = useState<Array<TodolistsType> | null>(null)
  
  useEffect(()=> {
  
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = ()=> {
  const [state,setState] = useState<TodolistsType | null>(null)

  useEffect(()=>{
  
  },[])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = ()=> {
  const [state, setState] = useState<TodolistsType | null>(null)
  
  useEffect(()=> {
  
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<TodolistsType | null>(null)

  useEffect(()=> {
  
  }, [])
  return <div>{JSON.stringify(state)}</div>
}