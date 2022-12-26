import {StyledDetailsProduct} from "./style.js";
import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import { Footer } from '../../components/molecules/footer/Footer';

export const DetailsProductPage = ({commerce}) => { 

    return (
        <>
            <NavBar />
            <StyledDetailsProduct>
                <h2>TITRE DU PRODUIT</h2>
            </StyledDetailsProduct>
            <Footer />
        </>
    )
}