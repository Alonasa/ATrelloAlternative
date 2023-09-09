import axios from 'axios';

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

export type ResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  data: T
}

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
	'API-KEY': 'b6104e2e-1f08-47cf-aa26-6f9004328f2f'
  }
})


export const TodolistsAPI = {
  getTodolists() {
	return instance.get<Array<TodolistType>>('todo-lists')
  },
  createTodolist() {
	return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: 'React'})
  },
  updateTodolist(todolistId: string, title: string) {
	return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  },
  deleteTodolist(todolistId: string) {
	return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  getTasks(todolistId: string) {
	return instance.get(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    let checkLenght = title.length<100 ? title : 'Message is too long'
	return instance.post(`todo-lists/${todolistId}/tasks`, {title})
  }
}