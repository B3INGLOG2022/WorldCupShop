import {StyledMailDiv} from "./style.js";
import { RecapMailItem } from '../../atoms/recapMailItem/RecapMailItem.jsx';

export const RecapMailDiv = ({items, finalPrice}) => { 

    return (
        <>
            <StyledMailDiv>
                {items.map(item => {
                    return (<RecapMailItem key={item.id} item={item}/>)
                })}
                <div className="cart-total-price">
                    <p>Prix Total : {finalPrice}€</p>
                </div>
            </StyledMailDiv>
        </>
    )
}