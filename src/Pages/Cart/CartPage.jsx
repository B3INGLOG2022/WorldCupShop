import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import { Footer } from '../../components/molecules/footer/Footer';
import {StyledCart} from "./style.js";

export const CartPage = ({commerce}) => { 

    return (
        <>
            <NavBar />
            <StyledCart>
                Panier
            </StyledCart>
            <Footer />
        </>
    )
}