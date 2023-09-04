import axios from 'axios';

export const instance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.1/', withCredentials: true})

const settings = {
  withCredentials: true,
  headers: {
	'API-KEY': 'b6104e2e-1f08-47cf-aa26-6f9004328f2f'
  }
}

export const TodolistsAPI = {
  getTodolists(){
	return instance.get('todo-lists')
  },
  createTodolist(){
    return instance.post('todo-lists', {title: 'React'})
  },
  updateTodolist(todolistId: string, title: string){
    return instance.put(`todo-lists/${todolistId}`, {title, todolistId})
  },
  deleteTodolist(todolistId: string){
    return instance.delete(`todo-lists/${todolistId}`)
  }
}