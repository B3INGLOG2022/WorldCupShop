import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import {StyledContactUs} from "./style.js";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import NavBar from '../../components/molecules/navBar/NavBar.jsx';


export const ContactPage = ({commerce}) => { 

    const form = useRef(); 
    const navigate = useNavigate();

    const sendEmail = (e) => { 
        e.preventDefault(); 
        emailjs 
        .sendForm(process.env.REACT_APP_SERVICE_ID,process.env.REACT_APP_TEMPLATE_ID,form.current,process.env.REACT_APP_PUBLIC_KEY ) 
        .then(
                (result) => { 
                    toast.success('Mail envoyé', {position: toast.POSITION.BOTTOM_CENTER}); 
                    handleSendMail() 
                },
                (error) => { 
                    navigate("/error");
                } 
        );
     };

    const handleSendMail = () => navigate("/");

    return (
        <>
        <NavBar commerce={commerce}/>
        <StyledContactUs>
        <Link to={"/"}>
                    
        </Link> 
        <Card id="section-product-rating-input">
            <CardHeader className="section-header" title="Contactez-nous" />
            <CardContent>
            <form ref={form} onSubmit={sendEmail}>
            <TextField  
                    className="section-user-name"
                    label="Nom et Prénom"
                    type="text"
                    name="user_name"
                    required
                />
                <TextField  
                    className="section-user-mail"
                    label="Mail"
                    type="email"
                    name="user_email"
                    required
                />
                <TextField
                    className="section-user-comment"
                    label="Commentaire"
                    placeholder="Ecrivez votre commentaire"
                    type="text"
                    name="message"
                    required
                    multiline
                />

                <Button  color="inherit" type="submit"  >
                        Envoyer
                </Button>
                </form>
            </CardContent>
        </Card>
   
    </StyledContactUs>
    </>
    )
}