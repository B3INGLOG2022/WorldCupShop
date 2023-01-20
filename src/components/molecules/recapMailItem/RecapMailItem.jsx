import {StyledRecapMailItem} from "./style.js";
import Card from '@mui/material/Card';

export const RecapMailItem = ({item}) => {


  return (
        <StyledRecapMailItem>
            <Card className='cart-product-item-card' sx={{backgroundColor: "#F6F3F0"}}>
                <div className='cart-product-item-img'>
                  <img src={item?.image?.url} alt="article" />
                </div>
                <div className='cart-product-item-desc'>
                  <h5>{item?.name}</h5>
                  <p>{item?.price?.formatted}€</p>
                  <p>{item?.selected_options[0]?.option_name}</p>
                </div>
                <div className='cart-product-item-center'>
                  <div className='cart-product-item-stock'>
                    <p>{item.quantity}</p>
                  </div>               
                  <div className="cart-list-product-price">
                    <p>{Number(item?.price?.raw*item.quantity).toFixed(2)} €</p>
                  </div>
                </div>  
                
            </Card>
        </StyledRecapMailItem>
  )

}


