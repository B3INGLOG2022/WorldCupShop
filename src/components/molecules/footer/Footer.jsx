import {StyledFooter} from "./style.js";
import logo_linkedin from "../../../imgs/icons/linkedin.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <StyledFooter>
        <section className="footer">
            <hr className="footer-seperator" />
            <section className="footer-social-media">
                <h5>Développé par</h5>
                <div>
                    <a href="https://www.linkedin.com/in/corentin-mailler/">Corentin MAILLER <img src={logo_linkedin} alt="linkedin" /></a>
                    <a href="https://www.linkedin.com/in/matthieu-bouillot/">Matthieu BOUILLOT <img src={logo_linkedin} alt="linkedin" /></a>
                </div>
            </section>
            <section className="footer-info">
                <section className="footer-info-left">
                    <section className="footer-info__returns">
                        Politique de retours
                        <br />
                        <br />
                        Livraisons
                    </section>        
                </section>
                <section className="footer-info-center">
                <section className="footer-info__terms">
                    Conditions d’utilisations et Mentions Légales
                    <br />
                    <br />
                    Tous droits réservés
                </section>
            </section>
            <section className="footer-info-right">
                <section className="footer-info__contact">
                    <Link to={"/contactUs"}>
                        Nous contacter
                    </Link>
                </section>                    
            </section>
            </section>
            <hr className="footer-seperator" />
        </section>
    </StyledFooter>
  );
};