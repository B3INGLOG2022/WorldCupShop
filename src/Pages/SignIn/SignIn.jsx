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
import { Progress } from "../../components/atoms/Progress/Progress.jsx";

export const SignIn = ({commerce}) => {
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingDirectus, setLoadingDirectus] = useState(false);
  const [loadingCommerceJs, setLoadingCommerceJs] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [cstmrId, setCstmrId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // une fois connecté --> changement de page
  const cstmrIdListener  = useSelector((state) => {
    return state?.auth?.cstmrId
    })  

  useEffect(() => {
      if (cstmrIdListener !== null){
          navigate("/")
      } else {
        if (cstmrId !== null && tokens !== []) {
          dispatch(login({
            email: email, 
            token : tokens[0], 
            refresh : tokens[1], 
            cstmr_id : cstmrId,
            first_name : firstName, 
            last_name : lastName
          }));
          toast.success('Connexion réussite', {
            position: toast.POSITION.BOTTOM_CENTER
          })
        } else if (localStorage.getItem("cstmrId") !== null) {
          loadingDirectus(true)
          loadingCommerceJs(true)
          dispatch(login({
            email: localStorage.getItem("email"), 
            token :localStorage.getItem("access_token"), 
            refresh :localStorage.getItem("refresh_token"), 
            cstmr_id : localStorage.getItem("cstmrId"), 
            first_name : localStorage.getItem("first_name"), 
            last_name : localStorage.getItem("last_name")
          }));
        }
      }
    }, [cstmrIdListener, cstmrId, tokens]);
    //////////////////////////////////////

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkEmail = () => /\S+@\S+\.\S+/.test(email);

  const handleSignUpClick = () => navigate("/sign-up");

  // connexion au compte directus + recuperation des tokens
  const connectUserDirectus = async () => {
    await axios
      .post(process.env.REACT_APP_DIRECTUS_URL+'auth/login',
      JSON.stringify({
        email:email,
        password:pwd
      }),{
        "headers": {
        "Content-Type": "application/json"
      }})
      .then((res) => {
        setTokens([res?.data?.data?.access_token, res?.data?.data?.refresh_token]);
      })
      .catch((err) => {
        if (err?.response?.data?.errors[0]?.message === 'Invalid user credentials.') {
          toast.error('Email ou mot de passe invalide', {
            position: toast.POSITION.BOTTOM_CENTER
          })
        } else {
          toast.error('Echec de connexion aux serveurs Directus.', {
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
        setLoadingDirectus(false)
      })
  }
  
  // récupération de l'id de l'utilisateur 
  const getCstmrs = async () => {
    await axios
      .get(process.env.REACT_APP_COMMERCEJS_URL+'customers',{headers: 'X-Authorization: '+process.env.REACT_APP_COMMERCEJS_SECRET_KEY}, JSON.stringify({
        "query": email
      }))
      .then((res) => {
        setFirstName(res?.data.data[0]?.firstname);
        setLastName(res?.data.data[0]?.lastname);
        setCstmrId(res?.data.data[0]?.id);
      })
      .catch((err) => {
        toast.error('Echec de connexion aux serveurs CommerceJs.', {
          position: toast.POSITION.BOTTOM_CENTER
        })
        console.log(err)  
        setLoadingCommerceJs(false)
      })
  }
  
  useEffect(() => {
    if (!loadingCommerceJs && !loadingCommerceJs) {
      setCstmrId(null);
      setTokens([]);
    } 
  }, [loadingCommerceJs, loadingDirectus]);



  const handleSignInClick = async() => {
    setLoadingDirectus(true)
    setLoadingCommerceJs(true)
    if (checkEmail()){
      await connectUserDirectus();
      await getCstmrs();
    } else {
      toast.error('Email ou mot de passe invalide', {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setPwd('')
      setLoadingDirectus(false)
      setLoadingCommerceJs(false)
    }
    
  };  
  
  return (loadingDirectus && loadingCommerceJs) ? (<Progress />):(

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
                onChange={(e)=>setPwd(e.target.value)}
                value={pwd}
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
          <Button className="signin-btn-connexion" onClick={handleSignInClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#AD0505",color: "#FFFFFF"}}>Se connecter</Button>
          <Button onClick={handleSignUpClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#FFFFFF",color: "#AD0505"}}>Devenir membre</Button>
        </div>    
        <ToastContainer />

      </div>
      
    </StyledSignIn>

  );

}