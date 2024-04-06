import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Things from "../../images/Things.jpg";
import { Typography, Link, Toolbar, Avatar, Button } from "@mui/material";
import { Logout } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
  const [ user, setUser ] = useState();
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

const logout = () => {
  dispatch({ type: 'LOGOUT' });
  setUser()
  navigate('/');
}

useEffect(() => {
  const token = user?.token
 if (token) {
  const decodedToken = decode(token);
  if (decodedToken.exp * 1000 < new Date().getTime) logout();
 }
 
  setUser(JSON.parse(localStorage.getItem('profile')));
}, [location])

  return (
    <div className="appBar">
    <Typography variant="h3" align="center" >
      <Link href="/" sx={{color: "white"}}>Memories</Link></Typography >
      <img src={Things} alt="Things" className="appImg"/>
    
    {/* <Toolbar> */}
      {user ? (
        <>
          <Typography variant="h6" sx={{margin:"7px 0 0 0", color:"gray"}}>{user.result.name}</Typography>
          <Avatar src={user.result.picture} alt={user.result.name.charAt(0)} sx={{margin:"7px 0 0 0"}}>{user.result.name.charAt(0)}</Avatar>
          <Button variant="contained" color="secondary" sx={{marginY:"10px"}} onClick={logout}>Logout</Button>
        </>
      ) : (
        <Button variant="contained" color="inherit"><a href="/auth">Sign In</a></Button>
      )
    }
    {/* </Toolbar> */}
  </div>
  )
}

export default Navbar