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
    const [loadingDirectus, setLoadingDirectus] = useState(false);
    const [loadingCommerceJs, setLoadingCommerceJs] = useState(false);
    const [creationSuccessDirectus, setCreationSuccessDirectus] = useState(false);
    const [creationSuccessCJS, setCreationSuccessCJS] = useState(false);    
    const [creationFailedDirectus, setCreationFailedDirectus] = useState(false);
    const [creationFailedCJS, setCreationFailedCJS] = useState(false);
    const [tokens, setTokens] = useState([]);
    const [cstmrId, setCstmrId] = useState();
    const [userId, setUserId] = useState();

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
            first_name:firstName,
            last_name:lastName,
            email:email,
            password:pwd,
            role:"adb00b00-b7f6-45ee-b671-8871fd17aa44",
        }),{
        "headers": {
            "Authorization": "Bearer "+admTokenListener,
            "Content-Type": "application/json"
        }})
        .then((res) => {
            setUserId(res?.data?.data?.id)
            setCreationSuccessDirectus(true);
        })
        .catch((err) => {
            console.log(err) 

            if (err?.response?.data?.errors[0]?.message === 'Token expired.') {
                toast.error('Token expiré', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            } else {
                toast.error('Echec de connexion au serveur Directus.', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
            setCreationFailedDirectus(true);
            setLoadingDirectus(false)
        })
    }
    
    // suppression du nouvel utilisateur sur directus
    const removeUserDirectus = async() => {
        await axios
        .delete(process.env.REACT_APP_DIRECTUS_URL+'users/'+userId,{
        "headers": {
            "Authorization": "Bearer "+admTokenListener,
            "Content-Type": "application/json"
        }})
        .then(() => {
            setCreationFailedCJS(false);
            setLoadingDirectus(false)
        })
        .catch((err) => {
            if (err?.response?.data?.errors[0]?.message === 'Token expired.') {
                toast.error('Token expiré', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            } else {
                toast.error('Echec de connexion au serveur Directus.', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
            setCreationFailedDirectus(false);
        })
        setTokens([]);
    }
    
    // création du nouvel utilisateur sur commercejs
    const createUserCommerceJs = async() => {
        await axios
            .post(process.env.REACT_APP_COMMERCEJS_URL+'customers',
            JSON.stringify({
                email: email,
                firstname: firstName,
                lastname: lastName,
                phone: "",
                external_id: ""
            }),{
            "headers": {
                "X-Authorization": process.env.REACT_APP_COMMERCEJS_SECRET_KEY,    
                "Content-Type": "application/json"
            }})
            .then(() => {
                setCreationSuccessCJS(true);
            })
            .catch((err) => {
                console.log(err) 

                toast.error('Echec de connexion au serveur CommerceJs.', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                setCreationFailedCJS(true);
                setLoadingCommerceJs(false);
            })
    }

    // suupression du nouvel utilisateur sur commercejs
    const removeUserCommerceJs = async() => {
        await axios
            .delete(process.env.REACT_APP_COMMERCEJS_URL+'customers',{headers: 'X-Authorization: '+process.env.REACT_APP_COMMERCEJS_SECRET_KEY})
            .then(() => {
                setCreationSuccessCJS(false);
                setLoadingCommerceJs(false)
            })
            .catch((err) => {
                console.log(err)
                toast.error('Echec de connexion au serveur CommerceJs.', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                setLoadingCommerceJs(false)
            })
        setCstmrId(undefined);
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
            setTokens([res?.data?.data?.access_token, res?.data?.data?.refresh_token]);
        })
        .catch((err) => {
            toast.error('Echec de connexion au serveur Directus.', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            console.log(err) 
            setLoadingDirectus(false)
        })
    }
  
  // récupération de l'id COMMERCEJS de l'utilisateur
    const getCstmrsId = async () => {
        await axios
        .get(process.env.REACT_APP_COMMERCEJS_URL+'customers',{headers: 'X-Authorization: '+process.env.REACT_APP_COMMERCEJS_SECRET_KEY}, JSON.stringify({
            "query": email
        }))
        .then((res) => {
            setCstmrId(res?.data.data[0]?.id);
        })
        .catch((err) => {
            if (err?.code === "ERR_NETWORK"){
                toast.error('Echec de connexion au serveur CommerceJs.', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            } else {
                toast.error('Echec de connexion au serveur CommerceJs.', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
            console.log(err)  
            setLoadingCommerceJs(false)
            
        })
    }

  // si le nouveau compte est bien créé sure directus ET sur commerceJs --> les connecter
  useEffect(() => {
    if (creationSuccessDirectus && creationSuccessCJS) {
        console.log("connect")
        connectUserDirectus();
        getCstmrsId();
    } else if (creationSuccessDirectus && !!creationSuccessCJS && creationFailedCJS) {
        console.log("removeUserDirectus")
        removeUserDirectus();
    } else if (!creationSuccessDirectus && creationSuccessCJS && creationFailedDirectus && cstmrId === undefined) {
        console.log("getIdCstmr")
        getCstmrsId();
    } else if (!creationSuccessDirectus && creationSuccessCJS && creationFailedDirectus && cstmrId !== undefined) {
        console.log("removeCstmr")
        removeUserCommerceJs();
    }
  }, [creationSuccessDirectus, creationSuccessCJS, creationFailedCJS, creationFailedDirectus, cstmrId]);

// si le nouveau compte est bien connecté sur Directus ET sur CommerceJs --> Login Success
  useEffect(() => {
    console.log(cstmrId, " - ", tokens)
    if (cstmrId !== undefined && tokens !== [] && !creationFailedCJS && !creationFailedDirectus) {
      dispatch(login({email: email, token :tokens[0], refresh :tokens[1], cstmr_Id : cstmrId}));
      toast.success('Connexion réussite', {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } 
  }, [cstmrId, tokens]);

    const handleSignUpClick = async() => {
        setLoadingDirectus(true);
        setLoadingCommerceJs(true);
        setCreationFailedDirectus(false);
        setCreationFailedCJS(false);
        if (pwd !== '' && firstName !== '' && lastName !== "" && pwdVerify !== ''){
            if (checkEmail()) {
                if (pwd === pwdVerify) {
                        await createUserDirectus();
                        await createUserCommerceJs();
                } else {
                    toast.error('Mot de passe invalid', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    setLoadingDirectus(false)
                    setLoadingCommerceJs(false)
                }
            } else {
                toast.error('Email invalid', {
                  position: toast.POSITION.BOTTOM_CENTER
                })
                setLoadingDirectus(false)
                setLoadingCommerceJs(false)
            }
        } else {
            toast.error('Des données sont manquantes', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            setLoadingDirectus(false)
            setLoadingCommerceJs(false)
        }
        
    };  
    

    return(loadingDirectus || loadingCommerceJs) ? (<Progress />):(
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
                    <Button className="signup-btn-register" onClick={handleSignUpClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#AD0505",color: "#FFFFFF"}}>Créer un compte</Button>
                    <Button onClick={handleSignInClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#FFFFFF",color: "#AD0505"}}>Déjà membre</Button>
                </div>    
                <ToastContainer />
            </div>

        </StyledSignUp>

    );
}