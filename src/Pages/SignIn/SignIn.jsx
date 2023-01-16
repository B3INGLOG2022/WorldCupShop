import React, {useEffect, useState} from "react";
import {StyledSignIn} from "./style.js"
import { useNavigate } from "react-router-dom";
import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../../slices/auth_slice";

export const SignIn = ({commerce}) => {
  
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkEmail = () => /\S+@\S+\.\S+/.test(email);

  const handleSignInClick = async() => {
    setLoading(true)
    if (checkEmail()){
      await axios
        .post(process.env.REACT_APP_DIRECTUS_URL+'auth/login',
        JSON.stringify({
          email:email,
          password:psw
        }),{
          "headers": {
          "Content-Type": "application/json"
        }})
        .then((res) => {
          dispatch(login({email: email, token :res?.data?.data?.access_token, refresh :res?.data?.data?.refresh_token}));
          toast.success('Connexion réussite', {
            position: toast.POSITION.BOTTOM_CENTER
          })
          setLoading(false);
        })
        .catch((err) => {
            setPsw('')
            toast.error('Email ou mot de passe invalide', {
              position: toast.POSITION.BOTTOM_CENTER
            })
            setLoading(false)
        })
    } else {
      toast.error('Email ou mot de passe invalide', {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setPsw('')
      setLoading(false)
    }
    
  };  
  
  const handleSignUpClick = () => navigate("/sign-up");

  const isLogged  = useSelector((state) => {
    return state?.auth?.isLoggedIn
  })

  useEffect(() => {
    if (isLogged){
      navigate("/")
    }
  }, [isLogged]);
  
  return (

    <StyledSignIn className="Login">
      <NavBar commerce={commerce}/>
      <div className="signin-body">
        <h2>Connectez-vous</h2>
        <div className="signin-email">

        <FormControl sx={{ m: 1, width: '30ch', color: "#AD0505 !important",}} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                <Typography sx={{color: "#AD0505 !important",}}>
                  Email *
                </Typography>
              </InputLabel>
              <Input
                type='text'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
          </FormControl>
        </div>
        <div className="signin-password">
          <FormControl sx={{ m: 1, width: '30ch', color: "#AD0505 !important" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">              
                <Typography sx={{color: "#AD0505 !important",}}>
                  Mot de passe *
                </Typography>
              </InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                onChange={(e)=>setPsw(e.target.value)}
                value={psw}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff sx={{color: "#AD0505 !important",}}/> : <Visibility sx={{color: "#AD0505 !important",}}/>}
                    </IconButton>
                  </InputAdornment>
                }
              />
          </FormControl>
        </div>  
        <div className="signin-btns">
          <Button className="signin-btn-connexion" disabled={loading?true:false} onClick={handleSignInClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#AD0505",color: "#FFFFFF"}}>Se connecter</Button>
          <Button onClick={handleSignUpClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#FFFFFF",color: "#AD0505"}}>Devenir membre</Button>
        </div>    
        <ToastContainer />

      </div>
      
    </StyledSignIn>

  );

}