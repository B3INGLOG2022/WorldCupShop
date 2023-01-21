import styled from "styled-components";


export const StyledCartItemProduct = styled.div`

    text-align: center;

    .cart-product-item-card{
        width: 100%;
        height: 120px;
        margin-top:5px;
        display: flex;
        justify-content: space-between;
    }

    .cart-product-item-desc{
        margin-left:10px;
        text-align:left;
        width:30%;
        margin-top:auto;
        margin-bottom: auto;
    }

    .cart-product-item-desc p{
        margin:5px;
        font-size:14px;
    }

    .cart-product-item-center{
        width:35%;
        display:flex;
        justify-content:center;
    }

    .cart-product-item-stock{
        width:60%;
        margin-top:auto;
        margin-bottom: auto;
    }

    .cart-list-product-price{
        width:40%;
        margin-left:5px;
        margin-top:auto;
        margin-bottom: auto;
    }

    .cart-product-item-img{
        width: 20%;
        margin-top:auto;
        margin-bottom: auto;
    }
    
    .cart-product-item-delete{
        width: 5%;
        margin-top:auto;
        margin-bottom: auto;
        margin-right: 5px;
    }
    
    .cart-product-item-delete svg{
        cursor:pointer;
    }

    img{
        margin : 5px;
        max-width: 100px;
        height: 100px
    }

`