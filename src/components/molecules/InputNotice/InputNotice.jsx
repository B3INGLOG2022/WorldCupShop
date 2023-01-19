import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import { Rating } from '@mui/material';
import {StyledInputNotice} from './style.js';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const InputNotice = ({idNotice, currentUserValue, currentUserTitle, currentUserComment}) => {

    const [rate, setRate] = useState((currentUserValue && currentUserValue) || 0) //récupérer note de l'utilisateur sur l'article si existant
    const [title, setTitle] = useState((currentUserTitle && currentUserTitle) || "")
    const [message, setMessage] = useState((currentUserComment && currentUserComment) || "") //récupérer note de l'utilisateur sur l'article si existant
    const [sending, setSending] = useState(false)
    const navigate = useNavigate();
    const params = useParams();

    const tokenSelector  = useSelector((state) => {
        return state?.auth?.token
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

    const sendNotices = async() => {
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
                .finally(() => {
                    toast.success('Merci pour votre retour !', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    setSending(false)
                    navigate('/products/'+params?.id);
                })
                .catch((err) => {
                    toast.error('Echec de l\'envoie de votre avis !', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    console.log(err)
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
                    toast.success('Merci pour votre retour !', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    setSending(false)
                    navigate('/products/'+params?.id);
                })
                .catch((err) => {
                    toast.error('Echec de l\'envoie de votre avis !', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    console.log(err)
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