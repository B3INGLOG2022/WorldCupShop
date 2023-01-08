import NavBar from '../../components/molecules/navBar/NavBar.jsx';
import { Footer } from '../../components/molecules/footer/Footer';
import {StyledProductsList} from "./style.js";
import { Product } from '../../components/molecules/product/Product.jsx';
import { useState, useEffect } from 'react';
import { SearchBar } from '../../components/molecules/searchBar/SearchBar.jsx';
import { Progress } from '../../components/atoms/Progress/Progress.jsx';
import { FormControl, InputLabel, MenuItem, Select as MUISelect } from '@mui/material';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ScrollUp } from '../../components/atoms/ScrollUp/ScrollUp.jsx';


export const ProductsPage = ({commerce}) => { 

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [productsFilters, setProductsFilters] = useState([])
    const [dataBrandFormated, setDataBrandFormated]  = useState([]);
    const [searchBarValue, setSearchBarValue]  = useState('');
    const [optionsBrandFormated, setOptionsBrandFormated]  = useState([]);
    const [notices, setNotices] = useState(null);
    const [sort, setSort] = useState(0) 
    const navigate = useNavigate();

    // sort functions
    const sortByPriceDec = () => {
        productsFilters.sort((a, b) => b.price.raw - a.price.raw);
    }
    
    const sortByPriceCr = () => {
        productsFilters.sort((a, b) => a.price.raw - b.price.raw);
    }

    const sortByName = () => {
        productsFilters.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    const handleChangeSort = (event) => {
        setSort(event.target.value);
        if (event.target.value === 1){
            sortByName()
        } else if (event.target.value === 2) {
            sortByPriceCr()
        } else if (event.target.value === 3) {
            sortByPriceDec()
        }
    };  

    // fetch functions
    const fetchNotices = async () => {
        await axios
            .get(process.env.REACT_APP_DIRECTUS_URL+'/items/notice')
            .then((res) => {
                setNotices(res.data)
                setIsLoading(false);
            })
            .catch((err) => {
                // navigate('/error');
                console.log(err)
            })
    }

    const fetchProducts = async(selectedBrands) => {
        await commerce.products.list().then((products) => {
            setProducts(products.data);
            setProductsFilters(products.data);
            fetchNotices();
        }).catch((error) => {
            // navigate('/error');
            console.log(error)
        });
    }

    const fetchCategories = async () => {
        var allBrandsFormated = [];
        var allBrands = [];
        await commerce.categories.retrieve('cat_ZRjywMVPJo7Y8G').then((brands) => {
            brands.children.map((brand, i) => {
                allBrands.push(brand.slug)
                allBrandsFormated.push({ value:i, label: brand.slug})
                
            });
            setDataBrandFormated(allBrandsFormated);
            setOptionsBrandFormated(allBrandsFormated)
            fetchProducts(allBrands);
        }).catch((error) => {
            // navigate('/error');
            console.log(error)
        });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!isLoading){
            let SearchProductsList = [];
            let filteredProductsList = [];
            // si on supprimer le contenue de la search bar --> afficher l'ensemble des produits
            if (searchBarValue !== ''||searchBarValue !== undefined||searchBarValue !== null){
                products.map((product)=>{
                    if (product.name.toLowerCase().includes(searchBarValue.toLowerCase())){
                        SearchProductsList.push(product);
                    }
                })  
            } else {
                SearchProductsList = products;
            }
            SearchProductsList.map((product)=>{
                if (dataBrandFormated.find((e) => e.label===product.categories[0].slug)!==undefined){
                    filteredProductsList.push(product);
                }
            })
            
            setSort(0);
            setProductsFilters(filteredProductsList);
        }
    },[dataBrandFormated, searchBarValue])


    const CalculateGlobalRate = (data) => {
        var addrate = 0;
        data.map((notice) => addrate += notice.note)
        return (addrate/data.length).toFixed(1);
    }

    const getNoticesById = (id_product) => {
        let nbNotice = 0;
        let noticesCatched = [];
        let totalRating = 0;
        notices.data.map((notice) => {
            if (notice.id_product === id_product) {
                noticesCatched.push(notice)
                nbNotice ++;
            }
        })
        totalRating = CalculateGlobalRate(noticesCatched);
        return [nbNotice, totalRating]
    }

    return (isLoading === true) ? (<Progress />) : (
        <>
            <NavBar id="top"/>
            <StyledProductsList>
                <div className='products-list-header'>
                    <SearchBar options={products} setSearchBarValue={setSearchBarValue}/>
                    <div className='products-list-header-sort-filtre'>
                        <div className='products-list-header-sort'>
                            <FormControl sx={{ m: 1, minWidth: 80, mt: 2,backgroundColor:"#FFFFFF",}}>
                                <InputLabel>Trier par</InputLabel>
                                <MUISelect
                                    value={sort}
                                    onChange={handleChangeSort}
                                    autoWidth
                                    label="Trier par"
                                >
                                    <MenuItem value={0}>Choisir</MenuItem>
                                    <MenuItem value={1}>Nom</MenuItem>
                                    <MenuItem value={2}>Prix croissant</MenuItem>
                                    <MenuItem value={3}>Prix decroissant</MenuItem>
                                </MUISelect>
                            </FormControl>
                        </div>
                        <div className='products-list-header-filtre'>
                            <p>Filtres :</p>
                            <Select
                                defaultValue={dataBrandFormated}
                                isMulti
                                name="colors"
                                onChange={(newBrands)=>setDataBrandFormated(newBrands)}
                                options={optionsBrandFormated}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                    </div>
                </div>
                <div className='products-list-articles'>
                    {(productsFilters.length > 0)?
                    productsFilters.map((product) => {
                        let current_value_notice = getNoticesById(product.id);
                        return (
                            <div key={product.id} className="products-list-articles-item" onClick={() => navigate('/products/'+ product.id)}>
                                <Product product={product} rate={Number(current_value_notice[1])} nbFeedBack={current_value_notice[0]} />
                            </div>
                        )
                    }):<p>Aucun produits ne correspond à vos critères</p>}
                </div>
            </StyledProductsList>
            <Footer />
            <ScrollUp scrollStepInPx={15} delayInMs={5}/>
        </>
    )
}