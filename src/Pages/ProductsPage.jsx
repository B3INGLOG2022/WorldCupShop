import NavBar from '../components/molecules/navBar/NavBar.jsx';
import { Footer } from '../components/molecules/footer/Footer';

export const ProductsPage = ({commerce}) => { 

    return (
        <>
            <NavBar />
            <div>
                Liste des produits
            </div>
            <Footer />
        </>
    )
}