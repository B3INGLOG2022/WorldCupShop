import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import { Rating } from '@mui/material';
import {StyledInputNotice} from './style.js';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useState } from "react";

export const InputNotice = ({currentUserValue, currentUserTitle, currentUserComment}) => {

    const [rate, setRate] = useState((currentUserValue && currentUserValue) || 0) //récupérer note de l'utilisateur sur l'article si existant
    const [title, setTitle] = useState((currentUserTitle && currentUserTitle) || "")
    const [message, setMessage] = useState((currentUserComment && currentUserComment) || "") //récupérer note de l'utilisateur sur l'article si existant

    const onSubmitRating = (sendRate, message) => {
        console.log('submit ' + sendRate + ' with message : ' + message);
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
                    <Button color="inherit" onClick={() => {onSubmitRating(rate, message)}} disabled={(rate !== 0) && (title.replace(/ /g,'').length > 0) ? false : true} variant="contained" sx={{m:1, width: .3, backgroundColor: "#FFFFFF",color: "#AD0505"}}>
                        Envoyer
                        <SendIcon />
                    </Button>
                </CardContent>
            </Card>
        </StyledInputNotice>
    )

}