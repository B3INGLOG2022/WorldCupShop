import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => { 
    const navigate = useNavigate();
    const handleClick = () => navigate('/');

    return (
        <div>
            Un problème est survenue
            <button type="button" onClick={handleClick}>
                Retour Page d'accueil
            </button>
        </div>
    )
}