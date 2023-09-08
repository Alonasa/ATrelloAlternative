import axios from 'axios';

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

type CreateTodolistResponseType = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: {
	item: TodolistType
  }
}


export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
	'API-KEY': 'b6104e2e-1f08-47cf-aa26-6f9004328f2f'
  }
})

type UpdateTodolistResponseType = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: {}
}


export const TodolistsAPI = {
  getTodolists() {
	return instance.get<Array<TodolistType>>('todo-lists')
  },
  createTodolist() {
	return instance.post<CreateTodolistResponseType>('todo-lists', {title: 'React'})
  },
  updateTodolist(todolistId: string, title: string) {
	return instance.put(`todo-lists/${todolistId}`, {title})
  },
  deleteTodolist(todolistId: string) {
	return instance.delete(`todo-lists/${todolistId}`)
  }
}