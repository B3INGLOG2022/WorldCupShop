import { useNavigate } from 'react-router-dom';
import {StyledErr} from "./style.js";

export const ErrorPage = () => { 
    const navigate = useNavigate();
    const handleClick = () => navigate('/');

    return (
        <StyledErr>
            Un problème est survenue
            <button type="button" onClick={handleClick}>
                Retour Page d'accueil
            </button>
        </StyledErr>
    )
}