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
import { useNavigate } from "react-router-dom";


export const InputNotice = ({idNotice, currentUserValue, currentUserTitle, currentUserComment}) => {

    const [rate, setRate] = useState((currentUserValue && currentUserValue) || 0) //récupérer note de l'utilisateur sur l'article si existant
    const [title, setTitle] = useState((currentUserTitle && currentUserTitle) || "")
    const [message, setMessage] = useState((currentUserComment && currentUserComment) || "") //récupérer note de l'utilisateur sur l'article si existant
    const navigate = useNavigate();

    const onSubmitRating = async () => {
        console.log(rate)
        console.log(title)
        console.log(message)
        if ((rate !== currentUserValue)||(title !== currentUserTitle)||(message !== currentUserComment)){
            if (idNotice){
                await axios
                    .patch(process.env.REACT_APP_DIRECTUS_URL+'/items/notice/'+idNotice+'?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MjM4YzgxLTZmNzItNDZjYS05YTcyLTZkMDEyOGMwOWFlZCIsInJvbGUiOiIzOWVmNzFjYy1lNzFmLTQzODEtYWM3Ni0zM2UwNDFhMDY3ZDEiLCJhcHBfYWNjZXNzIjoxLCJhZG1pbl9hY2Nlc3MiOjEsImlhdCI6MTY3MjY2NzIzNSwiZXhwIjoxNjcyNjY4MTM1LCJpc3MiOiJkaXJlY3R1cyJ9.FO-bRC0PtFa6XJ1p1V80JU9dNovnSVKAbaqKzS55M60',
                        JSON.stringify({
                            Note:{rate},
                            Title:{title},
                            Content:{message},
                        })
                    )
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                        // navigate('/error');
                    })
            } else {
                // await axios
                //     .post(process.env.REACT_APP_DIRECTUS_URL+'/items/notice',{headers: 'Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MjM4YzgxLTZmNzItNDZjYS05YTcyLTZkMDEyOGMwOWFlZCIsInJvbGUiOiIzOWVmNzFjYy1lNzFmLTQzODEtYWM3Ni0zM2UwNDFhMDY3ZDEiLCJhcHBfYWNjZXNzIjoxLCJhZG1pbl9hY2Nlc3MiOjEsImlhdCI6MTY3MjY1OTQwNywiZXhwIjoxNjcyNjYwMzA3LCJpc3MiOiJkaXJlY3R1cyJ9.-to136BupBMF1dCe6D9Ib6DzkJ2mhAyWfQDdPqOqbN0'}, {data: {
                //         "note":{rate},
                //         "Title":{title},
                //         "Content":{message},
                //     }})
                //     .then(() => {
                //         navigate(0);
                //     })
                //     .catch((err) => {
                //         console.log(err)
                //         // navigate('/error');
                //     })
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