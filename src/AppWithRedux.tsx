import React from 'react';
import './App.css';
import {AddItemForm} from './components/AddItemForm';
import {createTheme, ThemeProvider} from '@mui/material';
import {Menu} from './components/Menu/Menu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddTodolistAC} from './state/reducers/TodolistsReducer/TodolistsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {Todolist1} from './Todolist1';
import {FilterValueType} from './Todolist';

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

function AppWithRedux() {
  let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists);
  
  
  const dispatch = useDispatch();
  
  
  const addTodolist = (title: string) => {
	let action = AddTodolistAC(title);
	dispatch(action);
  }
  
  
  return (
	<ThemeProvider theme={theme}>
	  <Menu title={'Todolists'}/>
	  <div className="App" color={'info'}>
		<Grid container spacing={4}>
		  <Grid item xs={12} sm={12} md={12}>
			<AddItemForm addItem={addTodolist}/>
		  </Grid>
		  
		  
		  {todolists.map(tl => {
			return (
			  <Grid key={tl.id} item xs={12} sm={6} md={4}>
				<Paper elevation={6}
					   sx={{height: '100%', position: 'relative'}}>
				  <Todolist1
					tlId={tl.id}
				  />
				</Paper>
			  </Grid>
			)
		  })}
		</Grid>
	  </div>
	</ThemeProvider>
  );
}

export default AppWithRedux;
