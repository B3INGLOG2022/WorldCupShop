import {StyledContactUs} from "./style.js";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useState } from "react";

export const ContactPage = ({currentUserName,currentUserMail,currentUserComment}) => { 


    const [name, setName] = useState((currentUserName && currentUserName) || "") //Récupère le nom de l'utilisateur
    const [mail, setMail] = useState((currentUserMail && currentUserMail) || "") //Récupère le mail de l'utilisateur
    const [message, setMessage] = useState((currentUserComment && currentUserComment) || "") //récupère le commentaire de l'utilisateur

   

    return (
        <StyledContactUs>
            <Link to={"/"}>
                <ArrowBackIosIcon sx={{color: "#AD0505"}}/>
            </Link> 
            <Card id="section-product-rating-input">
                <CardHeader className="section-header" title="Contactez-nous" />
                <CardContent>
                <TextField  
                        className="section-user-name"
                        fullWidth
                        label="Nom"
                        defaultValue={name}
                        onChange={(e) => {setName(e.target.value);}}
                    />
                    <TextField  
                        className="section-user-mail"
                        fullWidth
                        label="Mail"
                        defaultValue={mail}
                        onChange={(e) => {setMail(e.target.value);}}
                    />
                    <TextField
                        className="section-user-comment"
                        label="Commentaire"
                        defaultValue={message}
                        placeholder="Ecrivez votre commentaire"
                        onChange={(e) => {setMessage(e.target.value);}}
                        multiline
                    />
                    
                </CardContent>
            </Card>
       
        </StyledContactUs>
    )
}