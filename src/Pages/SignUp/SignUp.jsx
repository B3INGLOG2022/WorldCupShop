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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../../slices/auth_slice.js";
import { Progress } from "../../components/atoms/Progress/Progress.jsx";

export const SignUp = (commerce) => {
  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdVerify, setPwdVerify] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordVerify, setShowPasswordVerify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tokens, setTokens] = useState([]);
    const [cstmrId, setCstmrId] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const admTokenListener  = useSelector((state) => {
        return state?.auth?.initialAuth?.admToken
    })


    // une fois connecté --> changement de page
    const isLogged  = useSelector((state) => {
    return state?.auth?.isLoggedIn
    })

    useEffect(() => {
        if (isLogged){
            navigate("/")
        }
    }, [isLogged]);
    //////////////////////////////////////


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowPasswordVerify = () => setShowPasswordVerify((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };  
    
    const handleMouseDownPasswordVerify = (event) => {
        event.preventDefault();
    };

    const handleSignInClick = () => navigate("/sign-in");

    const checkEmail = () => /\S+@\S+\.\S+/.test(email);

    // création du nouvel utilisateur sur directus
    const createUserDirectus = async() => {
        await axios
        .post(process.env.REACT_APP_DIRECTUS_URL+'users',
        JSON.stringify({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:pwd,
            role:"adb00b00-b7f6-45ee-b671-8871fd17aa44",
        }),{
        "headers": {
            "Authorization": "Bearer "+admTokenListener,
            "Content-Type": "application/json"
        }})
        .then(() => {
            toast.success('Utilisateur Directus créé', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        })
        .catch((err) => {
            if (err?.response?.data?.errors[0]?.message === 'Token expired.') {
                toast.error('Token expiré', {
                    position: toast.POSITION.BOTTOM_CENTER
                    })
            }
        })
    }
    
    // création du nouvel utilisateur sur commercejs
    const createUserCommerceJs = async() => {

        await axios
            .post(process.env.REACT_APP_COMMERCEJS_URL+'customers',
            JSON.stringify({
                email: email,
                phone: "",
                firstname: firstName,
                lastname: lastName,
                external_id: ""
            }),{
            "headers": {
                "X-Authorization": process.env.REACT_APP_COMMERCEJS_SECRET_KEY,    
                "Content-Type": "application/json"
            }})
            .then((res) => {
                toast.success('Utilisateur CommerceJs créé', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                connectUserDirectus();
            })
            .catch((err) => {
    
            })
    }

    // une fois l'utilisateur créé, connexion au nouveau compte
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
            toast.success('Connexion réussite', {
            position: toast.POSITION.BOTTOM_CENTER
            })
            console.log([res?.data?.data?.access_token, res?.data?.data?.refresh_token])
            setTokens([res?.data?.data?.access_token, res?.data?.data?.refresh_token]);
        })
        .catch((err) => {
            console.log(err) 
        })
    }
  
  // récupération de l'id de l'utilisateur pour
  // TODO erreur de reqete à corriger
  const getCstmrsId = async () => {
    await axios
      .get(process.env.REACT_APP_COMMERCEJS_URL+'customers',
        JSON.stringify({
          "query":"corentin.mailler@ynov.com",
        }),{
          headers: {
          "X-Authorization": "sk_test_49391ef22a406d71ffaae2a0ff96fe23556381e119d4d",
          "Content-Type": "application/json"
        }})
      .then((res) => {
        toast.success('Connexion réussite', {
          position: toast.POSITION.BOTTOM_CENTER
        })
        console.log(res)
        setCstmrId(res?.data[0]?.email);
      })
      .catch((err) => {
        console.log(err)  
      })
  }

    const handleSignUpClick = async() => {
        setLoading(true)
        if (pwd !== '' && firstName !== '' && lastName !== "" && pwdVerify !== ''){
            if (checkEmail()) {
                if (pwd === pwdVerify) {
                        await createUserDirectus();
                        await createUserCommerceJs();
                        await connectUserDirectus();
                        await getCstmrsId();
                        console.log(cstmrId !== undefined && tokens !== [])
                        if (cstmrId !== undefined && tokens !== []) {
                            dispatch(login({email: email, token :tokens[0], refresh :tokens[1], cstmr_Id : cstmrId}));
                        } else {
                            setPwd('')
                            setPwdVerify('')
                            toast.error('Email ou mot de passe invalide', {
                            position: toast.POSITION.BOTTOM_CENTER
                            })
                        }
                        setLoading(false)
                } else {
                    toast.error('Mot de passe invalid', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    setLoading(false)
                }
            } else {
                toast.error('Email invalid', {
                  position: toast.POSITION.BOTTOM_CENTER
                })
                setLoading(false)
            }
        } else {
            toast.error('Des données sont manquantes', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            setLoading(false)
        }
        
    };  
    

    return loading ? (<Progress />):(
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
                <div className="signup-password-verify">
                    <FormControl sx={{ m: 1, width: '30ch', color: "#AD0505 !important" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">              
                        <Typography sx={{color: "#AD0505 !important",}}>
                            Verification mot de passe *
                        </Typography>
                        </InputLabel>
                        <Input
                        type={showPasswordVerify ? 'text' : 'password'}
                        onChange={(e)=>setPwdVerify(e.target.value)}
                        value={pwdVerify}
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
                    <Button className="signup-btn-register" disabled={loading?true:false} onClick={handleSignUpClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#AD0505",color: "#FFFFFF"}}>Créer un compte</Button>
                    <Button onClick={handleSignInClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#FFFFFF",color: "#AD0505"}}>Déjà membre</Button>
                </div>    
                <ToastContainer />
            </div>

        </StyledSignUp>

    );
}