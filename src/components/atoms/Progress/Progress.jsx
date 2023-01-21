import {StyledProgress} from './style.js';
import CircularProgress from '@mui/material/CircularProgress';
import logo_WCS from "../../../imgs/logos/WORLDCUPSHOP_logo_rbg.png";

export const Progress = () => {

    return (
        <StyledProgress>
            <img src={logo_WCS} alt="WCS_logo" />
            <CircularProgress sx={{color: "#AD0505"}}/>
        </StyledProgress>
    )
}