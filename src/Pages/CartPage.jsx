import NavBar from '../components/molecules/navBar/NavBar.jsx';
import { Footer } from '../components/molecules/footer/Footer';

export const CartPage = ({commerce}) => { 

    return (
        <>
            <NavBar />
            <div>
                Panier
            </div>
            <Footer />
        </>
    )
}