import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {StyledSignIn} from "./style.js"
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";

export const SignIn = () => {

  

  return (

    <StyledSignIn className="Login">

      <Link to={"/"}>
        <ArrowBackIosIcon sx={{color: "#AD0505"}}/>
      </Link>
      Connexion
      <Link to={"/sign-up"}>
        <ListItemText primary="S'inscrire" sx={{color: "#AD0505"}} />
      </Link>
    </StyledSignIn>

  );

}