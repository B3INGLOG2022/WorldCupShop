import {StyledScrollUp} from './style.js'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { IconButton } from '@mui/material';

import { useState } from 'react';

export const ScrollUp = ({ scrollStepInPx, delayInMs }) => {
   
    // Le state "scroll" permet de savoir si un scroll est en cours
     const [scroll, setScroll] = useState(false);
  
    // Fonction chargée du scroll 
     const scrollStep = () => {
         if (window.pageYOffset === 0) {
            // Le scroll est terminé, 
            //on utilise  intervalId pour arrêter la répétition
             clearInterval(intervalId);
            // on repasse le state "scoll" à false
             setScroll(false);
         }
         window.scroll(0, window.pageYOffset - scrollStepInPx);
     };
    
     const intervalId = scroll ? setInterval(scrollStep, delayInMs) : undefined;
 
 
     return (
        <StyledScrollUp>
            <IconButton aria-label="scroll to top" onClick={e => scroll || setScroll(true)}>
                <ArrowCircleUpIcon  sx={{color: "#AD0505"}}/>
            </IconButton>
        </StyledScrollUp>
     )
 };
 
