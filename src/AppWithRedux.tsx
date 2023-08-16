import React from 'react';
import './App.css';
import {FilterValueType, TasksType, Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import {createTheme, ThemeProvider} from '@mui/material';
import {Menu} from './components/Menu/Menu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC
} from './state/reducers/TodolistsReducer/TodolistsReducer';
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC
} from './state/reducers/TasksReducers/TasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistsType} from './App';

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


function AppWithRedux() {
  let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists);
  
  let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
  
  const dispatch = useDispatch();
  
  const removeTask = (tlId: string, id: string) => {
	dispatch(RemoveTaskAC(tlId, id));
  }
  
  const changeFilter = (tlId: string, filter: FilterValueType) => {
	dispatch(ChangeTodolistFilterAC(tlId, filter));
  }
  
  const addTask = (tlId: string, title: string) => {
	dispatch(AddTaskAC(tlId, title))
  }
  
  const changeTaskStatus = (tlId: string, id: string) => {
	dispatch(ChangeTaskStatusAC(tlId, id))
  }
  
  const addTodolist = (title: string) => {
	let action = AddTodolistAC(title);
	dispatch(action);
  }
  
  const changeTitle = (tlId: string, id: string, newTitle: string) => {
	if (newTitle.trim()) {
	  dispatch(ChangeTaskTitleAC(tlId, id, newTitle))
	}
  }
  
  const changeTodolistTitle = (tlId: string, newTitle: string) => {
	dispatch(ChangeTodolistTitleAC(tlId, newTitle))
  }
  
  const removeTodolist = (tlId: string) => {
	let action = RemoveTodolistAC(tlId);
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
			let tasksCopy = tasks[tl.id];
			if (tl.filter === 'Active') {
			  tasksCopy = tasks[tl.id].filter(t => !t.isDone)
			}
			if (tl.filter === 'Completed') {
			  tasksCopy = tasks[tl.id].filter(t => t.isDone)
			}
			
			return (
			  <Grid item xs={12} sm={6} md={4}>
				<Paper elevation={6}
					   sx={{height: '100%', position: 'relative'}}>
				  <Todolist
					key={tl.id}
					tlId={tl.id}
					mainTitle={tl.title}
					task={tasksCopy}
					removeTask={removeTask}
					changeFilter={changeFilter}
					addTask={addTask}
					filter={tl.filter}
					changeTaskStatus={changeTaskStatus}
					changeTitle={changeTitle}
					changeTodolistTitle={changeTodolistTitle}
					removeTodolist={removeTodolist}
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
