import React from 'react';
import './App.css';
import {createTheme, LinearProgress, ThemeProvider} from '@mui/material';
import Grid from '@mui/material/Grid';
import {Menu} from '../components/Menu/Menu';
import {useAppSelector} from './store';
import {FilterValueType} from '../todolist/Todolist';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Login} from '../features/login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {TodolistList} from '../todolist/TodolistList';
import {ErrorPage} from '../components/ErrorPage/ErrorPage';


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
  let status = useAppSelector<RequestStatusType>((state) => state.app.status);
  
  return (
	<ThemeProvider theme={theme}>
	  <Menu title={'Todolists'}/>
	  {status === 'loading' && <LinearProgress/>}
	  <div className="App" color={'info'}>
		<Grid container spacing={4}>
		  <Routes>
			<Route path={'/'} element={<TodolistList/>}/>
			<Route path={'/login'} element={<Login/>}/>
			<Route path={'404'} element={<ErrorPage/>}/>
			<Route path={'*'} element={<Navigate to={'404'}/>}/>
		  </Routes>
		  <ErrorSnackbar/>
		</Grid>
	  </div>
	</ThemeProvider>
  );
}

export default App;
