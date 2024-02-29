import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from 'app/store';
import {logOutTC} from 'features/login/auth-reducer';
import {Menu, MenuItem} from '@mui/material';
import {NavLink} from 'react-router-dom';

type MenuType = {
  title: string;
};

export const MainMenu = (props: MenuType) => {
  let {title} = props;
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
	setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
	setAnchorElNav(null);
  };
  
  const isLoggedIn = useAppSelector<boolean>(
	(state) => state.auth.isLoggedIn
  );
  
  const logOutHandler = () => {
	dispatch(logOutTC());
  };
  
  const navDataStyleHandler = (navData: boolean) => {
	return navData ? 'active' : ''
  }
  return (
	<Box sx={{flexGrow: 1}}>
	  <AppBar position="static">
		<Toolbar variant="dense">
		  <IconButton
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{mr: 2}}
			onClick={handleOpenNavMenu}
		  >
			<MenuIcon/>
		  </IconButton>
		  <Typography variant="h6" color="inherit" component="div">
			{title}
		  </Typography>
		  <Menu
			id="menu-appbar"
			title="My title"
			anchorEl={anchorElNav}
			anchorOrigin={{
			  vertical: 'bottom',
			  horizontal: 'left',
			}}
			keepMounted
			transformOrigin={{
			  vertical: 'top',
			  horizontal: 'left',
			}}
			open={Boolean(anchorElNav)}
			onClose={handleCloseNavMenu}
		  >
			{isLoggedIn ? (
			  <NavLink to={'/login'}
					   className={(navData) => navDataStyleHandler(navData.isActive)}>
				<MenuItem onClick={handleCloseNavMenu} key={'logout'}>
				  <Typography variant="h6" color="inherit" component="div">
					<Button variant={'text'} onClick={logOutHandler}
							color="inherit">
					  LogOut
					</Button>
				  </Typography>
				</MenuItem>
			  </NavLink>
			) : (<NavLink to={'/login'}
						  className={(navData) => navDataStyleHandler(navData.isActive)}>
			  <MenuItem onClick={handleCloseNavMenu} key={'login'}>
				<Typography variant="h6" color="inherit" component="div">
				  <Button variant={'text'}
						  color="inherit">
					LogIn
				  </Button>
				</Typography>
			  </MenuItem>
			</NavLink>)}
		  </Menu>
		</Toolbar>
	  </AppBar>
	</Box>
  );
};
