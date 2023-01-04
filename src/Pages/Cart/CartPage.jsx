import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import {StyledCart} from "./style.js";
import { useState } from 'react';
import { CartItemProduct } from '../../components/molecules/cartItemProduct/CartItemProduct.jsx';
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Progress } from '../../components/atoms/Progress/Progress.jsx';
import { useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { addItem } from "../../store/index.js";


export const CartPage = ({commerce}) => { 

    const [finalPrice, setFinalPrice] = useState(0)
    const [codeReduc, setCodeReduc] = useState('')
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

    const cartFinalPriceSelector  = useSelector((state) => {
        return state.cart.cartPrice
    })

    useEffect(() => {
        console.log('Price', cartFinalPriceSelector);
    }, [cartFinalPriceSelector])

    const calculateGlobalPrice = (items) => {
        let listPrices = [];
        let totalPrice = 0;
        items.map((item)=>listPrices.push(item.line_total.formatted))
        for (var i = 0; i < listPrices.length; i++) {
            totalPrice += Number(listPrices[i]);
        }
        setFinalPrice(totalPrice.toFixed(2));
    }

    const calculateSold = (reduction) => ((finalPrice-(finalPrice*reduction)).toFixed(2))
    
    const verifyCode = () => {
        console.log(codeReduc)
    }

    const validateCart = () => {
        console.log("panier validé")
    }

    const fetchCart = async () => {
        let listItems
        await commerce.cart.retrieve()
        .then((cart) => {
            listItems = cart.line_items;
            listItems.map((item) => dispatch(addItem({id: item.id, price :item?.price?.raw, stock: item.quantity})))
        });
        setIsLoading(false);
        setItems(listItems);
        calculateGlobalPrice(listItems)
    }

    useEffect(() => {
        fetchCart();
    }, []);

    return isLoading ? (<Progress />) : (
        <>
            <NavBar />
            <StyledCart>
                <h2>Récapitulatif de mon panier</h2>
                {(items.length > 0) ? items.map(item => {
                    return (<CartItemProduct key={item.id} item={item} items={items} setItems={setItems} commerce={commerce}/>)
                }): <p>aucun article</p>},
                <div className="cart-total-price">
                    <p>Total : {cartFinalPriceSelector}€</p>
                </div>
                <div className="cart-reduction-section">
                    <FormControl sx={{ m: 1, width: '30ch', color: "#AD0505 !important",}} variant="standard">
                        <InputLabel>
                            <Typography sx={{color: "#AD0505 !important",}}>
                                Code de Reduction
                            </Typography>
                        </InputLabel>
                        <Input
                            type='text'
                            value={codeReduc}
                            onChange={(e)=>setCodeReduc(e.target.value)}
                        />
                    </FormControl>
                    <Button className="validate-code-reduction" onClick={()=>verifyCode()} color="inherit" variant="outlined" sx={{m:1, width: .5, backgroundColor: "#FFFFFF",color: "#AD0505"}}>Valider code</Button>
                </div>
                <Button className="cart-btn-buy" onClick={()=>{validateCart()}} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#AD0505",color: "#FFFFFF"}}>Payer</Button>
            </StyledCart>
        </>
    )
}