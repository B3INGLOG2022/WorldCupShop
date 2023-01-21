import {StyledMailDiv} from "./style.js";
import { RecapMailItem } from '../../atoms/recapMailItem/RecapMailItem.jsx';

export const RecapMailDiv = ({items, finalPrice}) => { 

    return (
        <>
            <StyledMailDiv>
                <h2>Récapitulatif de mon panier</h2>
                {items.map(item => {
                    return (<RecapMailItem key={item.id} item={item}/>)
                })}
                <div className="cart-total-price">
                    <p>Total : {finalPrice}€</p>
                </div>
            </StyledMailDiv>
        </>
    )
}