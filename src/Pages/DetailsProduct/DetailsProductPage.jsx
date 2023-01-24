import {StyledDetailsProduct} from "./style.js";
import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import { Footer } from '../../components/molecules/footer/Footer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";
import { Rating } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Notice } from "../../components/molecules/notice/Notice.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Progress } from "../../components/atoms/Progress/Progress.jsx";
import { useSelector } from "react-redux";
import { addItem } from "../../slices/cart_slice.js";

export const DetailsProductPage = ({commerce}) => { 

    const [size, setSize] = useState('')
    const [variantId, setVariantId] = useState('')
    const [stock, setStock] = useState(1)
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [globalRate, setGlobalRate] = useState('');
    const [notices, setNotices] = useState(null);
    const [ourNotice, setOurNotices] = useState({});

    const navigate = useNavigate();
    const params = useParams();
    
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

    const fetchNotices = async () => {
        await axios
            .get(process.env.REACT_APP_DIRECTUS_URL+'items/notice')
            .then((res) => {
                getNoticesById(res.data)
            })
            .catch((err) => {
                navigate('/error');
            })
    }

    const fetchProduct = () => {
        commerce.products.retrieve(params?.id).then((product) => {
            setProduct(product);
            setVariantId(product?.variant_groups[0]?.id)
            fetchNotices();
        }).catch(() => {
            navigate('/error');
        });
    }

    const postCart = async() => {
        let item = {};
        let alreadyExistStock = 0;
        item[variantId] = size;
        toast.info('Ajout du produit au panier ...', {
            position: toast.POSITION.BOTTOM_CENTER
        })
        await commerce.cart.retrieve()
        .then((cart) => {
            alreadyExistStock = (cart.line_items.find(item => (item.product_id === product.id) && (item?.selected_options[0]?.option_id === size)))?.quantity || 0
        });
        if (alreadyExistStock < 10) {
            let requestStock = ((alreadyExistStock+stock)>10)? (10 - alreadyExistStock) : stock
            await commerce.cart.add(params?.id, requestStock, item)
            .finally(() => {
                toast.success('Produit ajouté au panier', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                setIsAdding(false);
            })
            .catch(() => {
                navigate('/error');
            });
        } else {
            toast.error('Maximum de produits déjà réservé pour cette taille', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            setIsAdding(false);
        }
        
        
        

    }

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleChangeSize = (event) => {
        setSize(event.target.value);
    };

    const handleChangeStock = (event) => {
        setStock(event.target.value);
    };

        
    const CalculateGlobalRate = (data) => {
        var addrate = 0;
        data.map((notice) => addrate += notice.note)
        return (addrate/data.length).toFixed(1);
    }

    const getNoticesById = (cNotices) => {
        let noticesCatched = [];
        let ourNoticeCatched = {};
        let totalRating = 0;
        cNotices.data.map((notice) => {
            if (notice.id_product === params?.id) {
                noticesCatched.push(notice)
                if (notice.id_user === cstmrIdListener){ // changer cstmr_A12JwrBegRwPjn avec utilisateur connecté
                    ourNoticeCatched = notice;
                }
            }
        })
        totalRating = CalculateGlobalRate(noticesCatched);
        setGlobalRate(totalRating);
        setNotices(noticesCatched)
        setOurNotices(ourNoticeCatched)
        setIsLoading(false);
    }

    return isLoading ? (<Progress />) : (
        <>
            <NavBar commerce={commerce}/>
            <StyledDetailsProduct>
                <div className="product-header">
                    <Link to={"/products"}>
                        <ArrowBackIosIcon sx={{color: "#AD0505"}}/>
                    </Link>
                    <div>
                        <h2>{product.name}</h2>
                        <h4>ref {product.sku} - {product.categories[0].name}</h4>
                        <a href="#section-product-rating"><Rating readOnly precision={0.1} value={Number(globalRate)}/></a>
                    </div>
                </div>
                <img src={product.image.url} alt="article" />
                <hr className="section-product-seperator" />
                <div id="product-infos-command">
                    <div id="Product-Size">
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel>Taille</InputLabel>
                            <Select
                                disabled={isAdding?true:false}
                                value={size}
                                onChange={handleChangeSize}
                                autoWidth
                                label="Size"
                            >
                                <MenuItem value=""><em>Choisissez une taille</em></MenuItem>
                                {product.variant_groups[0].options.map((size,key) => (
                                    <MenuItem key={key} value={size.id}>{size.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div id="Product-Stock">
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel>Stock</InputLabel>
                            <Select
                                value={stock}
                                disabled={isAdding?true:false}
                                onChange={handleChangeStock}
                                autoWidth
                                label="Size"
                            >
                                <MenuItem key={1} value={1}>1</MenuItem>
                                <MenuItem key={2} value={2}>2</MenuItem>
                                <MenuItem key={3} value={3}>3</MenuItem>
                                <MenuItem key={4} value={4}>4</MenuItem>
                                <MenuItem key={5} value={5}>5</MenuItem>
                                <MenuItem key={6} value={6}>6</MenuItem>
                                <MenuItem key={7} value={7}>7</MenuItem>
                                <MenuItem key={8} value={8}>8</MenuItem>
                                <MenuItem key={9} value={9}>9</MenuItem>
                                <MenuItem key={10} value={10}>10</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div id="Product-infos-command-price">
                        <Typography>
                            {product.price.formatted}€
                        </Typography>
                    </div>
                </div>
                <Button id="Product-add-cart-btn" color="inherit" onClick={() => {setIsAdding(true); postCart()}} disabled={(size && !isAdding) ? false : true} variant="contained" sx={{m:1, width: .3, backgroundColor: "#FFFFFF",color: "#AD0505"}}>
                    <Typography>
                        Ajouter au panier
                    </Typography>
                    <ShoppingCartIcon sx={(size) ? {color: "#AD0505"} : {color: "#FFFFFF"}}/>
                </Button>
                <ToastContainer />
                <hr className="section-product-seperator" />
                <div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="section-product-desc"
                        >
                            <Typography>Description</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {ReactHtmlParser(product.description)}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="section-product-rating"
                        >
                            <Typography>Avis</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Notice globalRate={globalRate} noticesList={notices} ourNotice={ourNotice}/>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </StyledDetailsProduct>
            <Footer />
        </>
    )
}