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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Notice } from "../../components/molecules/notice/Notice.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Progress } from "../../components/atoms/Progress/Progress.jsx";

export const DetailsProductPage = ({commerce}) => { 

    const [size, setSize] = useState('')
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [globalRate, setGlobalRate] = useState('');

    const navigate = useNavigate();
    const params = useParams();
    const dataNotice = [{"username":"toto", "rate":1, "title":"NE L'ACHETEZ SURTOUT PAS","comment":"Il faudrait être fou pour porter un maillot comme celui là (celui de la France est bien mieux)","date":"2021-04-03T04:54:56.227415+00:00"},
        {"username":"toto", "rate":2, "title":"bof","comment":"","date":"2019-04-03T04:54:56.227415+00:00"},
        {"username":"toto", "rate":5, "title":"good article","comment":"i buy this article for the world cup and it was a pleasure to wear it","date":"2022-05-03T04:54:56.227415+00:00"}
    ]
    
    const CalculateGlobalRate = (data) => {
        var addrate = 0;
        data.map((notice) => addrate += notice.rate)
        return (addrate/data.length).toFixed(1);
    }

    const fetchProduct = () => {
        commerce.products.retrieve(params?.id).then((product) => {
            setProduct(product);
            setIsLoading(false);
            setGlobalRate(CalculateGlobalRate(dataNotice));
        }).catch((error) => {
            navigate('/error');
        });
    }
    
    useEffect(() => {
        fetchProduct();
    }, []);

    const handleChangeSize = (event) => {
        setSize(event.target.value);
        console.log(event.target.value);
    };

    

    return isLoading ? (<Progress />) : (
        <>
            <NavBar />
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
                                value={size}
                                onChange={handleChangeSize}
                                autoWidth
                                label="Size"
                            >
                                <MenuItem value=""><em>Choisissez une taille</em></MenuItem>
                                {product.variant_groups[0].options.map((size,key) => (
                                    <MenuItem key={key} value={size.name}>{size.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div id="Product-infos-command-price">
                        <Typography>
                            {product.price.formatted}€
                        </Typography>
                    </div>
                </div>
                <Button id="Product-add-cart-btn" color="inherit" onClick={() => {}} disabled={(size) ? false : true} variant="contained" sx={{m:1, width: .3, backgroundColor: "#FFFFFF",color: "#AD0505"}}>
                    <Typography>
                        Ajouter au panier
                    </Typography>
                    <ShoppingCartIcon sx={(size) ? {color: "#AD0505"} : {color: "#FFFFFF"}}/>
                </Button>
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
                            <Notice globalRate={globalRate} NoticesList={dataNotice}/>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </StyledDetailsProduct>
            <Footer />
        </>
    )
}