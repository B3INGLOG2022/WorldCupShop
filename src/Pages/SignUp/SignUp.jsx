import React, {useEffect, useState} from "react";
import {StyledSignUp} from "./style.js"
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
import { useSelector } from "react-redux";

export const SignUp = (commerce) => {
  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [pswVerify, setPswVerify] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordVerify, setShowPasswordVerify] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowPasswordVerify = () => setShowPasswordVerify((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };  
    
    const handleMouseDownPasswordVerify = (event) => {
        event.preventDefault();
    };

    const checkEmail = () => /\S+@\S+\.\S+/.test(email);

    const handleSignUpClick = () => {
        
        if (psw !== '' && firstName !== '' && lastName !== "" && pswVerify !== ''){
            if (checkEmail()) {
                if (psw === pswVerify) {
                    toast.success('Création du compte fictive réussite', {
                    position: toast.POSITION.BOTTOM_CENTER
                    })
                } else {
                    toast.error('Mot de passe invalid', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                }
            } else {
                toast.error('Email invalid', {
                  position: toast.POSITION.BOTTOM_CENTER
                })
            }
        } else {
            toast.error('Des données sont manquantes', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        
    };  
    
    const handleSignInClick = () => navigate("/sign-in");
    
    const isLogged  = useSelector((state) => {
        return state?.auth?.isLoggedIn
      })
    
    useEffect(() => {
        if (isLogged){
            navigate("/")
        }
    }, [isLogged]);

    return (

        <StyledSignUp className="Register">
            <NavBar commerce={commerce}/>
            <div className="signup-body">
                <h2>Devenez membre</h2>
                <div className="signup-undertitle">
                    <p>Devenez membre pour ne plus passer à côté des promotions, des offres, des remises et des bons de réduction.</p>
                </div>
                <div className="signup-lastname">
                    <FormControl sx={{ m: 1, width: '30ch', color: "#AD0505 !important",}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">
                        <Typography sx={{color: "#AD0505 !important",}}>
                            Nom *
                        </Typography>
                        </InputLabel>
                        <Input
                        type='text'
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        />
                    </FormControl>
                </div>
                <div className="signup-firstname">
                    <FormControl sx={{ m: 1, width: '30ch', color: "#AD0505 !important",}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">
                        <Typography sx={{color: "#AD0505 !important",}}>
                            Prénom *
                        </Typography>
                        </InputLabel>
                        <Input
                        type='text'
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        />
                    </FormControl>
                </div>
                <div className="signup-email">
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
                <div className="signup-password">
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
                <div className="signup-password-verify">
                    <FormControl sx={{ m: 1, width: '30ch', color: "#AD0505 !important" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">              
                        <Typography sx={{color: "#AD0505 !important",}}>
                            Verification mot de passe *
                        </Typography>
                        </InputLabel>
                        <Input
                        type={showPasswordVerify ? 'text' : 'password'}
                        onChange={(e)=>setPswVerify(e.target.value)}
                        value={pswVerify}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordVerify}
                                onMouseDown={handleMouseDownPasswordVerify}
                            >
                                {showPasswordVerify ? <VisibilityOff sx={{color: "#AD0505 !important",}}/> : <Visibility sx={{color: "#AD0505 !important",}}/>}
                            </IconButton>
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                </div>  
                <div className="signup-btns">
                    <Button className="signup-btn-register" onClick={handleSignUpClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#AD0505",color: "#FFFFFF"}}>Créer un compte</Button>
                    <Button onClick={handleSignInClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#FFFFFF",color: "#AD0505"}}>Déjà membre</Button>
                </div>    
                <ToastContainer />
            </div>

        </StyledSignUp>

    );

}