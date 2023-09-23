import {TasksReducer} from '../state/reducers/TasksReducers/TasksReducer';
import {TodolistsReducer} from '../state/reducers/TodolistsReducer/TodolistsReducer';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore
} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppReducer} from './app-reducer';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  todolists: TodolistsReducer,
  app: AppReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

type ExtraArg = any
export type ThunkType = ThunkDispatch<AppRootStateType, ExtraArg, AnyAction>;
export const useAppDispatch = useDispatch<ThunkType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
//@ts-ignore
window.store = store;
