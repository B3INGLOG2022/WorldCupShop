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


export const ProductsPage = ({commerce}) => { 

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [dataBrandFormated, setDataBrandFormated]  = useState([]);
    const [notices, setNotices] = useState(null);
    // const [brands, setBrands]  = useState([]);
    const [sort, setSort] = useState(0) 
    const navigate = useNavigate();

    // sort functions
    const sortByPriceDec = () => {
        products.sort((a, b) => b.price.raw - a.price.raw);
    }
    
    const sortByPriceCr = () => {
        products.sort((a, b) => a.price.raw - b.price.raw);
    }

    const sortByName = () => {
        products.sort((a, b) => a.name.localeCompare(b.name));
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
                console.log(err)
            })
    }

    const fetchProducts = async(selectedBrands) => {
        await commerce.products.list().then((products) => {
            setProducts(products.data);
            fetchNotices();
        }).catch((error) => {
            navigate('/error');
            // console.log(error)
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
            // setBrands(allBrands)
            setDataBrandFormated(allBrandsFormated);
            fetchProducts(allBrands);
        }).catch((error) => {
            navigate('/error');
            // console.log(error)
        });
    }

    // const fetchProductsByName = (name) => {
    //     commerce.products.list({query: {name}}).then((products) => {
    //         setProducts(products.data);
    //         console.log(products);
    //     }).catch((error) => {
    //         // navigate('/error');
    //         console.log(error)
    //     });
    // }

    // const fetchProductsByBrands = (selectedBrands) => {
    //     console.log(selectedBrands);
    //     commerce.products.list({
    //         category_slug: ['nike'],
    //       }).then(products => {
    //         setProducts(products.data);
    //         console.log(products);
    //     }).catch((error) => {
    //         // navigate('/error');
    //         console.log(error)
    //     });
    // }

    // const listProductstoShow = () => {
    //     let allProductsToShow = [];
    //     products.map((product) => {
    //         if (brands.includes(product?.categories[0]?.slug)) {
    //             allProductsToShow.push(product)
    //         }
    //     });
    //     setProductsToShow(allProductsToShow);
    //     console.log(allProductsToShow)
    //     if (isLoading2) {
    //         setIsLoading2(false);
    //     }
    // }

    useEffect(() => {
        fetchCategories();
    }, []);


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
            <NavBar />
            <StyledProductsList>
                <div className='products-list-header'>
                    <SearchBar options={products}/>
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
                                options={dataBrandFormated}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                    </div>
                </div>
                <div className='products-list-articles'>
                    {products.map((product) => {
                        let current_value_notice = getNoticesById(product.id);
                        return (
                            <div key={product.id} className="products-list-articles-item" onClick={() => navigate('/products/'+ product.id)}>
                                <Product product={product} rate={Number(current_value_notice[1])} nbFeedBack={current_value_notice[0]} />
                            </div>
                        )
                    })}
                </div>
            </StyledProductsList>
            <Footer />
        </>
    )
}