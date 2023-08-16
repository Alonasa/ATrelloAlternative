import React, {useReducer} from 'react';
import './App.css';
import {FilterValueType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {createTheme, ThemeProvider} from '@mui/material';
import {Menu} from './components/Menu/Menu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  TodolistsReducer
} from './state/reducers/TodolistsReducer/TodolistsReducer';
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  TasksReducer
} from './state/reducers/TasksReducers/TasksReducer';

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


function AppWithReducers() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  let [todolists, dispatchToTodolists] = useReducer(TodolistsReducer, [
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'},
  ])
  
  let [tasks, dispatchToTasks] = useReducer(TasksReducer, {
	[todolistID1]: [
	  {id: v1(), title: 'HTML&CSS', isDone: true},
	  {id: v1(), title: 'JS', isDone: true},
	  {id: v1(), title: 'ReactJS', isDone: false},
	  {id: v1(), title: 'Rest API', isDone: false},
	  {id: v1(), title: 'GraphQL', isDone: false},
	],
	[todolistID2]: [
	  {id: v1(), title: 'HTML&CSS2', isDone: true},
	  {id: v1(), title: 'JS2', isDone: true},
	  {id: v1(), title: 'ReactJS2', isDone: false},
	  {id: v1(), title: 'Rest API2', isDone: false},
	  {id: v1(), title: 'GraphQL2', isDone: false},
	]
  });
  
  
  const removeTask = (tlId: string, id: string) => {
	dispatchToTasks(RemoveTaskAC(tlId, id));
  }
  
  const changeFilter = (tlId: string, filter: FilterValueType) => {
	dispatchToTodolists(ChangeTodolistFilterAC(tlId, filter));
  }
  
  const addTask = (tlId: string, title: string) => {
	dispatchToTasks(AddTaskAC(tlId, title))
  }
  
  const changeTaskStatus = (tlId: string, id: string) => {
	dispatchToTasks(ChangeTaskStatusAC(tlId, id))
  }
  
  const addTodolist = (title: string) => {
	let action = AddTodolistAC(title);
	dispatchToTodolists(action);
	dispatchToTasks(action);
  }
  
  const changeTitle = (tlId: string, id: string, newTitle: string) => {
	if (newTitle.trim()) {
	  dispatchToTasks(ChangeTaskTitleAC(tlId, id, newTitle))
	}
  }
  
  const changeTodolistTitle = (tlId: string, newTitle: string) => {
	dispatchToTodolists(ChangeTodolistTitleAC(tlId, newTitle))
  }
  
  const removeTodolist = (tlId: string) => {
    let action = RemoveTodolistAC(tlId);
	dispatchToTodolists(action);
	dispatchToTasks(action);
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

export default AppWithReducers;
