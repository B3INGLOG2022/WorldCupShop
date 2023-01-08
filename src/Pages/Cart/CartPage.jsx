import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import {StyledCart} from "./style.js";
import { useState } from 'react';
import { CartItemProduct } from '../../components/molecules/cartItemProduct/CartItemProduct.jsx';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Progress } from '../../components/atoms/Progress/Progress.jsx';
import { useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { addItem } from "../../store/index.js";
import { useNavigate } from 'react-router-dom';
// import { FormControl, Input, InputLabel, Typography } from '@mui/material';


export const CartPage = ({commerce}) => { 

    // const [codeReduc, setCodeReduc] = useState('')
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartFinalPriceSelector  = useSelector((state) => {
        return state.cart.cartPrice
    })
    
    const cartItemsListSelector  = useSelector((state) => {
        return state.cart.listItems
    })

    useEffect(() => {
        console.log('Price', cartFinalPriceSelector);
    }, [cartFinalPriceSelector])
    
    useEffect(() => {
        if (items.length > 0) {
            let newListItems = [];
            items.map((item)=> {
                if (cartItemsListSelector.find((saveItem)=>saveItem.id === item.id)){
                    newListItems.push(item);
                }
            })
            setItems(newListItems)
        }
    }, [cartItemsListSelector])

    // const calculateSold = (reduction) => ((finalPrice-(finalPrice*reduction)).toFixed(2))
    
    // const verifyCode = () => {
    //     console.log(codeReduc)
    // }

    const validateCart = () => {
        commerce.cart.delete().then(() => navigate('/thanks'));
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
                    return (<CartItemProduct key={item.id} item={item} commerce={commerce}/>)
                }): <p>aucun article</p>},
                <div className="cart-total-price">
                    <p>Total : {cartFinalPriceSelector}€</p>
                </div>
                {/* <div className="cart-reduction-section">
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
                </div> */}
                <Button className="cart-btn-buy" onClick={()=>{validateCart()}} disabled={(items.length > 0)?false:true} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#AD0505",color: "#FFFFFF"}}>Payer</Button>
            </StyledCart>
        </>
    )
}