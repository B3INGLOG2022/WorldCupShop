import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {StyledSignUp} from "./style.js"
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";

export const SignUp= () => {
    
    return (

        <StyledSignUp className="SignUp">

            <Link to={"/"}>
                <ArrowBackIosIcon sx={{color: "#AD0505"}}/>
            </Link>
            Inscription
            <Link to={"/sign-in"}>
                <ListItemText primary="Se connecter" sx={{color: "#AD0505"}} />
            </Link>
        </StyledSignUp>

    );

}