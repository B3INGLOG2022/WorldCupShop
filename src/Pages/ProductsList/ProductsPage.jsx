import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import { Footer } from '../../components/molecules/footer/Footer';
import {StyledProductsList} from "./style.js";

export const ProductsPage = ({commerce}) => { 

    return (
        <>
            <NavBar />
            <StyledProductsList>
                Liste des produits
            </StyledProductsList>
            <Footer />
        </>
    )
}