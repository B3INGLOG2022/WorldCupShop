import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import { Footer } from '../../components/molecules/footer/Footer';
import {StyledHome} from "./style.js";

export const Home = ({commerce}) => { 

    return (
        <>
            <NavBar />
            <StyledHome>
                HELLO WORLD !
            </StyledHome>
            <Footer />
        </>
    )
}