import { useNavigate } from 'react-router-dom';
import { StyledErr } from "./style.js";
import Button from "@mui/material/Button";
import erreurImg from "../../imgs/erreur/tristeMbappe.png";
import logo from "../../imgs/logos/WORLDCUPSHOP_logo_rbg.png";




export const ErrorPage = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate('/');
    const handleClickContact = () => navigate('/Contact-us');

    return (
        <StyledErr >

            <div style={{
                backgroundColor: `#F6F3F0`,
                height: `100%`
            }}>
                <div className='div' >
                <img src={logo} alt="logo" />
                </div>
                <div className='div' >
                    <h1> Oups !!!</h1>
                </div>
                <div className='div'>

                    <h5> Ce n'est pas le page que vous rechercher </h5>
                </div>
                <div className='div'>
                    <img src={erreurImg} alt="erreurImg" />

                </div>
                <div className='div'>
                
                <Button onClick={handleClick}>
                    Retour à l'acceuil
                </Button>
                <Button onClick={handleClickContact}>
                    Contactez-nous
                </Button>
                </div>
            </div>





        </StyledErr>
    )
}