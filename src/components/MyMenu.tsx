import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Container, Button, Avatar, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from './User';
import {logoStyles } from './styles';

const pages = [{ text: 'Our Recipes', link: '/showRecipes' }, { text: 'Home', link: '/home' }];
const settings = [{ text: 'Update', link: '/update' }, { text: 'Logout', link: '/logout' }];

const MyMenu = () => {
  const [user] = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElNav(e.currentTarget);
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElUser(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const avatarLetter = user?.firstName ? user.firstName.charAt(0) : '';

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 210, 100, 0.4)', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Typography component={NavLink} to={page.link} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={logoStyles}
          >
            My Recipes
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button key={page.text} component={NavLink} to={page.link} sx={{ color: 'white', margin: 2, textDecoration: 'none' }}>
                {page.text}
              </Button>))}
            {user.id > 0 && <Typography
              variant="h6"
              component={NavLink}
              to="/addRecipe"
              sx={{ color: 'white', margin: 2, textDecoration: 'none' }}
            >
              Add recipe
            </Typography>}
          </Box>
          {user.id !== 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: 'rgba(0, 210, 100, 0.4)', color: 'white' }}>{avatarLetter}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu} >
                {settings.map((setting) => (
                  <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                    <NavLink to={setting.link} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                      <Typography>{setting.text}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MyMenu;

