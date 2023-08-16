import {TasksReducer} from './reducers/TasksReducers/TasksReducer';
import {TodolistsReducer} from './reducers/TodolistsReducer/TodolistsReducer';
import {combineReducers, legacy_createStore} from 'redux';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  todolists: TodolistsReducer
})

export const store = legacy_createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store;
