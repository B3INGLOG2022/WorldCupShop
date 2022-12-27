import {StyledContactUs} from "./style.js";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";

export const ContactPage = ({commerce}) => { 

    return (
        <StyledContactUs>
            <Link to={"/"}>
                <ArrowBackIosIcon sx={{color: "#AD0505"}}/>
            </Link>
            Favoris
        </StyledContactUs>
    )
}