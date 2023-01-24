import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import {StyledCart} from "./style.js";
import { useState } from 'react';
import { CartItemProduct } from '../../components/molecules/cartItemProduct/CartItemProduct.jsx';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Progress } from '../../components/atoms/Progress/Progress.jsx';
import { useSelector, useDispatch} from 'react-redux'
import { addItem } from "../../slices/cart_slice";
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {  toast } from 'react-toastify';
import { RecapMailDiv } from '../../components/molecules/recapMailDiv/RecapMailDiv.jsx';




export const CartPage = ({commerce}) => { 

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isValidate, setIsValidate] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartFinalPriceSelector  = useSelector((state) => {
        return state?.cart?.cartPrice
    })
    
    const cartItemsListSelector  = useSelector((state) => {
        return state?.cart?.listItems
    })

    const authListener  = useSelector((state) => {
        return state?.auth
    })

    //////////////////////////////////////
    const cstmrIdListener  = useSelector((state) => {
        return state?.auth?.cstmrId
    })

    useEffect(() => {
        if (cstmrIdListener === null) {
            navigate("/sign-in")
        }
    }, [])    
    //////////////////////////////////////
    
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

    const fetchCart = async () => {
        let listItems
        await commerce.cart.retrieve()
        .then((cart) => {
            listItems = cart.line_items;
            listItems.map((item) => dispatch(addItem({id: item.id, name:item.name, img: item.image.url, price :item?.price?.raw, stock: item.quantity, size: item.selected_options[0].option_name
            })))
        });
        setIsLoading(false);
        setItems(listItems);
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const sendEmail = () => { 
        emailjs.send("react_contact_detail","cart_page_template",{
            firstName : authListener.firstName,
            lastName : authListener.lastName,
            email : authListener.email,
            mailRecap : <RecapMailDiv items={items} finalPrice={cartFinalPriceSelector}/>
            },"Y3hWXStduBjejVOni" ) 
        .then(
            (result) => { 
                toast.success('Mail envoyé', {position: toast.POSITION.BOTTOM_CENTER}); 
                handleSendMail();
            },
            (error) => { 
                navigate("/error");
            } 
        );
     };

    const handleSendMail = () => {
        commerce.cart.empty();
        navigate("/thanks");
    }

    const validateCart = () => {
        setIsValidate(true);
        sendEmail();
    }

    return (isLoading || isValidate) ? (<Progress />) : (
        <>
            <NavBar commerce={commerce} />

            <StyledCart>
                <h2>Récapitulatif de mon panier</h2>
                {(items.length > 0) ? items.map(item => {
                    return (<CartItemProduct key={item.id} item={item} commerce={commerce}/>)
                }): <p>aucun article</p>},
                <div className="cart-total-price">
                    <p>Total : {cartFinalPriceSelector}€</p>
                </div>
                <Button className="cart-btn-buy" onClick={() => {validateCart()}} disabled={(items.length > 0)?false:true} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#AD0505",color: "#FFFFFF"}}>Payer</Button>
            </StyledCart>
        </>
    )
}