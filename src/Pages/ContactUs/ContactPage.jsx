import Button from "@mui/material/Button";
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

    const onSubmitMessage = (name,mail,message) => {
        console.log('Name : ' + name + '| mail : ' + mail + '| message : ' + message);
        if((name.length > 0) && (mail.length > 0) && (message.length > 0)){
            name = "";
            mail = "";
            message = "";
            mailSend(true);

        }
        else
        {
            mailSend(false);
        }
    }
    const mailSend = (send) => {
        if (send == true){
            console.log("Mail envoyé");
        }
        else{
            console.log("Erreur de saisie");
        }


    }

    return (
        <StyledContactUs>
            <Link to={"/"}>
                <ArrowBackIosIcon sx={{color: "#AD0505"}}/>
            </Link> 
            <Card id="section-card">
                <CardHeader className="section-header" title="Contactez-nous" />
                <CardContent  className="section-content">
                <TextField  
                        className="section-user-name"                        
                        label="Nom"
                        defaultValue={name}
                        onChange={(e) => {setName(e.target.value);}}
                    />
                    <TextField  
                        className="section-user-mail"
                        label="Mail"
                        defaultValue={mail}
                        onChange={(e) => {setMail(e.target.value);}}
                    />
                    <TextField
                        className="section-user-comment"
                        label="Commentaire"
                        defaultValue={message}
                        onChange={(e) => {setMessage(e.target.value);}}
                        multiline
                    />
                    <p></p>


                    <Button  color="inherit" onClick={() => {onSubmitMessage(name,mail,message)}} >
                        Envoyer
                    </Button>
                    
                </CardContent>
            </Card>
       
        </StyledContactUs>
    )
}