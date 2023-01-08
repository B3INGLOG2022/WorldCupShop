import {StyledCartItemProduct} from "./style.js";
import Card from '@mui/material/Card';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import { Stock } from "../../atoms/Stock/Stock.jsx";
import { useDispatch } from "react-redux";
import { addItemStock,removeItemStock, deleteItem } from "../../../store/index.js";

export const CartItemProduct = ({item, commerce}) => {

  const [stock, setStock] = useState(item.quantity || 1);
  const [stockLoading, isStockLoading] = useState(false);
  const [priceProduct, setPriceProduct] = useState(Number((item?.price?.raw*stock).toFixed(2)))
  const dispatch = useDispatch();
  
  const handleAddOneItem = () => {
    dispatch(addItemStock({id: item.id, price :item?.price?.raw, stock: stock+1}))
    setStock(stock+1);
    setPriceProduct(Number((item?.price?.raw*(stock+1)).toFixed(2)))
    commerce.cart.update(item.id, {quantity: stock+1})
  }

  const handleRemoveOneItem = () => {
    dispatch(removeItemStock({id: item.id, price :item?.price?.raw, stock: stock-1}))
    setStock(stock-1);
    setPriceProduct(Number((item?.price?.raw*(stock-1)).toFixed(2)))
    commerce.cart.update(item.id, {quantity: stock-1})
  }

  const handleDeleteItem = () => {
    dispatch(deleteItem({id: item.id}))
    commerce.cart.remove(item.id);
  }

  return (
    <StyledCartItemProduct>
        <StyledCartItemProduct>
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
                    <Stock handleAddOneItem={handleAddOneItem} handleRemoveOneItem={handleRemoveOneItem} stock={Number(stock)} commerce={commerce}/>
                  </div>               
                  <div className="cart-list-product-price">
                    <p>{priceProduct} €</p>
                  </div>
                </div>  
                <div className="cart-product-item-delete">
                  <DeleteForeverIcon onClick={()=>handleDeleteItem()}/>
                </div>
                
            </Card>
        </StyledCartItemProduct>
    </StyledCartItemProduct>
  )

}


