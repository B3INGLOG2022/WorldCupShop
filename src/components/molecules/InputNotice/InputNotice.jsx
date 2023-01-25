import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import { Rating } from '@mui/material';
import {StyledInputNotice} from './style.js';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {useEffect, useState} from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../../slices/auth_slice.js";
import { navigate } from "@storybook/addon-links";

export const InputNotice = ({idNotice, currentUserValue, currentUserTitle, currentUserComment}) => {

    const [rate, setRate] = useState((currentUserValue && currentUserValue) || 0) //récupérer note de l'utilisateur sur l'article si existant
    const [title, setTitle] = useState((currentUserTitle && currentUserTitle) || "")
    const [message, setMessage] = useState((currentUserComment && currentUserComment) || "") //récupérer note de l'utilisateur sur l'article si existant
    const [sending, setSending] = useState(false)
    const [neadRefresh,setNeadRefresh] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();

    const tokenSelector  = useSelector((state) => {
        return state?.auth?.token
    })    
    
    const refreshSelector  = useSelector((state) => {
        return state?.auth?.refreshToken
    })
    
    const cstmrIdSelector  = useSelector((state) => {
        return state?.auth?.cstmrId
    })
    
    const onSubmitRating = () => {
        if ((rate !== currentUserValue)||(title !== currentUserTitle)||(message !== currentUserComment)){
            setSending(true)
            sendNotices();
        } else {
            toast.info('Aucune modification n\'a été apportée', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    useEffect(() => {
        if (neadRefresh){
            setNeadRefresh(false);
            sendNotices();
        }
    }, [tokenSelector]);
    

    // regénération du token de notre utilisateur courant
    const refreshCurrentToken = async () => {
        await axios
            .post(process.env.REACT_APP_DIRECTUS_URL+'auth/refresh',
                JSON.stringify({
                    refresh_token:refreshSelector,
                    mode:'json'
                }),{
                    "headers": {
                    "Content-Type": "application/json"
                }}
            ).then((res) => {
                dispatch(refresh({
                    "token" : res?.data?.data?.access_token,
                    "refresh" : res?.data?.data?.refresh_token
                  }));
            })
            .catch((err) => {
                navigate('/error')
            })
    }

    // envoie du nouvel avis de l'utilisateur courant
    const sendNotices = async() => {
        // si l'avis était déjà existant --> le modifier
        // sinon --> le créer
        if (idNotice){
            await axios
                .patch(process.env.REACT_APP_DIRECTUS_URL+'items/notice/'+idNotice,
                    JSON.stringify({
                        note:rate,
                        Title:title,
                        Content:message,
                    }),{ 
                        "headers": {
                            "Authorization": "Bearer "+tokenSelector,
                            "Content-Type": "application/json"
                        },
                    }
                )
                .then(()=>{
                    setSending(false)
                })
                .finally(() => {
                    window.location.reload(false);
                })
                .catch((err) => {
                    if (err?.response?.data?.errors[0]?.message === 'Token expired.' || err?.response?.data?.errors[0]?.message === 'Invalid user credentials.') {
                        refreshCurrentToken()
                        setNeadRefresh(true);
                    }
                    toast.error('Echec de l\'envoie de votre avis !', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                })
        } else {
            await axios
                .post(process.env.REACT_APP_DIRECTUS_URL+'items/notice',
                
                JSON.stringify({
                    "status": 'published',
                    "id_product": params?.id,
                    "id_user": cstmrIdSelector,
                    "note": rate,
                    "Title": title,
                    "Content": message
                }), {
                    "headers" : {
                        "Authorization": "Bearer "+tokenSelector,
                        "Content-Type": "application/json"
                    }
                },)
                .then(() => {
                    setSending(false)
                })
                .finally(()=>{
                    window.location.reload(false);
                })
                .catch((err) => {
                    toast.error('Echec de l\'envoie de votre avis !', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                })
        }
    }

    return (
        <StyledInputNotice>
            <Card id="section-product-rating-input">
                <CardHeader className="section-header-rating-input" title="Votre avis compte" />
                <CardContent>
                    <div id="section-user-rating">
                        <Rating precision={1} size="large" value={rate} onChange={(event, newValue) => {setRate(newValue);}}/>
                    </div>
                    <TextField  
                        className="section-user-title"
                        fullWidth
                        label="Titre"
                        defaultValue={title}
                        onChange={(e) => {setTitle(e.target.value);}}
                    />
                    <TextField
                        className="section-user-comment"
                        label="Commentaire"
                        defaultValue={message}
                        placeholder="Ecrivez votre commentaire"
                        onChange={(e) => {setMessage(e.target.value);}}
                        multiline
                    />
                    <Button color="inherit" onClick={() => {onSubmitRating()}} disabled={(rate !== 0) && (title.replace(/ /g,'').length > 0) && sending? true : false} variant="contained" sx={{m:1, width: .3, backgroundColor: "#FFFFFF",color: "#AD0505"}}>
                        Envoyer
                        <SendIcon />
                    </Button>
                    <ToastContainer />
                </CardContent>
            </Card>
        </StyledInputNotice>
    )

}