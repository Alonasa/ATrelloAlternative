import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

type MenuType = {
  title: string
}

export const Menu = (props: MenuType) => {
  let {title} = props;
  return (
	<Box sx={{flexGrow: 1}}>
	  <AppBar position="static">
		<Toolbar variant="dense">
		  <IconButton edge="start" color="inherit" aria-label="menu"
					  sx={{mr: 2}}>
			<MenuIcon/>
		  </IconButton>
		  <Typography variant="h6" color="inherit" component="div">
			{title}
		  </Typography>
		</Toolbar>
	  </AppBar>
	</Box>
  );
};