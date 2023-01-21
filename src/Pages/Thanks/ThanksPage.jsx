import {StyledThanks} from "./style.js";
import logo_WCS from "../../imgs/logos/WORLDCUPSHOP_logo_rbg.png";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

export const ThanksPage = () => { 
    const navigate = useNavigate();
    const handleHomeClick = () => navigate('/');
    return (
        <StyledThanks>
            <img src={logo_WCS} alt="WCS_logo" />
            <h1>Merci de votre Achat !</h1>
            <p>Le récapitulatif de votre achat vient de vous être envoyé par email.</p>
            <Button onClick={handleHomeClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#FFFFFF",color: "#AD0505"}}>
                Retour à l'accueil
            </Button>
            <br/>
            <a href="/contact-us">Pour plus de précision, Contactez-nous</a>
        </StyledThanks>
    )
}