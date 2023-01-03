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

export const InputNotice = ({idNotice, currentUserValue, currentUserTitle, currentUserComment}) => {

    const [rate, setRate] = useState((currentUserValue && currentUserValue) || 0) //récupérer note de l'utilisateur sur l'article si existant
    const [title, setTitle] = useState((currentUserTitle && currentUserTitle) || "")
    const [message, setMessage] = useState((currentUserComment && currentUserComment) || "") //récupérer note de l'utilisateur sur l'article si existant
    const navigate = useNavigate();
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MjM4YzgxLTZmNzItNDZjYS05YTcyLTZkMDEyOGMwOWFlZCIsInJvbGUiOiIzOWVmNzFjYy1lNzFmLTQzODEtYWM3Ni0zM2UwNDFhMDY3ZDEiLCJhcHBfYWNjZXNzIjoxLCJhZG1pbl9hY2Nlc3MiOjEsImlhdCI6MTY3Mjc0NTU4OCwiZXhwIjoxNjcyNzQ2NDg4LCJpc3MiOiJkaXJlY3R1cyJ9.3VVBC2u-3qSujd6yoBuQULn16d79e_q0bIyjH74MtTQ"
    const params = useParams();
    
    const onSubmitRating = async () => {
        if ((rate !== currentUserValue)||(title !== currentUserTitle)||(message !== currentUserComment)){
            if (idNotice){
                await axios
                    .patch(process.env.REACT_APP_DIRECTUS_URL+'/items/notice/'+idNotice,
                        JSON.stringify({
                            note:rate,
                            Title:title,
                            Content:message,
                        }),{ 
                            "headers": {
                                "Authorization": "Bearer "+access_token,
                                "Content-Type": "application/json"
                            },
                        }
                    )
                    .finally(() => {
                        // toast.success('Merci pour votre avis !', {
                        //     position: toast.POSITION.BOTTOM_CENTER
                        // })
                        navigate('/products/'+params?.id);
                    })
                    .catch(() => {
                        toast.error('Echec de l\'envoie de votre avis !', {
                            position: toast.POSITION.BOTTOM_CENTER
                        })
                        navigate('/error');
                    })
            } else {
                await axios
                    .post(process.env.REACT_APP_DIRECTUS_URL+'/items/notice',
                    
                    JSON.stringify({
                        "id_product": params?.id,
                        "id_user": "cstmr_A12JwrBegRwPjn",
                        "note": rate,
                        "Title": title,
                        "Content": message
                    }), {
                        "headers" : {
                            "Authorization": "Bearer "+access_token,
                            "Content-Type": "application/json"
                        }
                    },)
                    .then(() => {
                        // toast.success('Merci pour votre avis !', {
                        //     position: toast.POSITION.BOTTOM_CENTER
                        // })
                        navigate('/products/'+params?.id);
                    })
                    .catch((err) => {
                        toast.error('Echec de l\'envoie de votre avis !', {
                            position: toast.POSITION.BOTTOM_CENTER
                        })
                        navigate('/error');
                    })
            }
        } else {
            toast.info('Aucune modification n\'a été apportée', {
                position: toast.POSITION.BOTTOM_CENTER
            });
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
                    <Button color="inherit" onClick={() => {onSubmitRating()}} disabled={(rate !== 0) && (title.replace(/ /g,'').length > 0) ? false : true} variant="contained" sx={{m:1, width: .3, backgroundColor: "#FFFFFF",color: "#AD0505"}}>
                        Envoyer
                        <SendIcon />
                    </Button>
                    <ToastContainer />
                </CardContent>
            </Card>
        </StyledInputNotice>
    )

}