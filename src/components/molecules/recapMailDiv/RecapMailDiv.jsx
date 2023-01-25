import { RecapMailItem } from '../../atoms/recapMailItem/RecapMailItem.jsx';
import { Email, Span, Item} from 'react-html-email'

export const RecapMailDiv = ({items, finalPrice}) => { 


    return (
        <Email title='Récapitulatif de votre commande'>
            <Item align='center'>
                <Span fontSize={18} fontWeight="bold" align='center'>Récapitulatif de votre commande</Span>
            </Item>
            <Item align='center'>
                {items.map(item => {
                    return (<RecapMailItem key={item.id} item={item}/>)
                })}
            </Item>
            <Item align='center' >
                <Span fontSize={16} fontWeight="bold" align='center'>Prix Total : {finalPrice}€</Span>
            </Item>
        </Email>
    )
}