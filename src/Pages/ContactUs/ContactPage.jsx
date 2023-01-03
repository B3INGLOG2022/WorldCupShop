import React, { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';
import {StyledContactUs} from "./style.js";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";


export const ContactPage = ({}) => { 


    
    const form = useRef(); 
    const sendEmail = (e) => { 
        e.preventDefault(); emailjs .sendForm(process.env.REACT_APP_SERVICE_ID,process.env.REACT_APP_TEMPLATE_ID, 
            form.current,process.env.REACT_APP_PUBLIC_KEY ) .then(
                 (result) => { alert('Votre message a bien été envoyé...'); console.log(result.text); },
                  (error) => { console.log(error.text); } ); };


    return (
        <StyledContactUs>
        <Link to={"/"}>
            <ArrowBackIosIcon sx={{color: "#AD0505"}}/>
        </Link> 
        <Card id="section-product-rating-input">
            <CardHeader className="section-header" title="Contactez-nous" />
            <CardContent>
            <form ref={form} onSubmit={sendEmail}>
            <TextField  
                    className="section-user-name"
                    label="Nom"
                    type="text"
                    name="user_name"
                />
                <TextField  
                    className="section-user-mail"
                    label="Mail"
                    type="email"
                    name="user_mail"
                />
                <TextField
                    className="section-user-comment"
                    label="Commentaire"
                    placeholder="Ecrivez votre commentaire"
                    type="text"
                    name="message"
                    multiline
                />

                <Button  type="submit"  >
                        Envoyer
                </Button>
                </form>
            </CardContent>
        </Card>
   
    </StyledContactUs>
    )
}