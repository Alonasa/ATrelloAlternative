import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {createTheme, LinearProgress, ThemeProvider} from '@mui/material';
import {Menu} from '../components/Menu/Menu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  CreateTodolistTC,
  GetTodo,
  TodolistDomainType
} from '../state/reducers/TodolistsReducer/TodolistsReducer';
import {useAppDispatch, useAppSelector} from './store';
import {FilterValueType, Todolist} from '../todolist/Todolist';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Login} from '../features/login/Login';
import { Routes, Route } from 'react-router-dom';
import {TodolistList} from '../todolist/TodolistList';


let theme = createTheme({
  palette: {
	primary: {
	  main: '#405194',
	},
	secondary: {
	  main: '#c01460',
	},
	info: {
	  main: '#867ae1',
	},
	error: {
	  main: '#d43c7a',
	},
  }
})

theme = createTheme(theme, {
  palette: {
	brown: theme.palette.augmentColor({
	  color: {
		main: '#d49643',
	  },
	  name: 'brown',
	}),
	rose: theme.palette.augmentColor({
	  color: {
		main: '#bd627f',
	  },
	  name: 'rose'
	}),
  }
})


export type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
}

function App() {
  let status = useAppSelector<RequestStatusType>((state)=> state.app.status);
  
  return (
	<ThemeProvider theme={theme}>
	  <Menu title={'Todolists'}/>
	  {status=== "loading" && <LinearProgress/>}
	  <div className="App" color={'info'}>
		  <Routes>
			<Route path={'/'} element={<TodolistList/>}/>
			<Route path={'/login'} element={<Login/>}/>
		  </Routes>
		<ErrorSnackbar/>
	  </div>
	</ThemeProvider>
  );
}

export default App;
