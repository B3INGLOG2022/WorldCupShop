import styled from "styled-components";


export const StyledDetailsProduct = styled.div`

    .product-header{
        display: flex;
        margin-left: 10px;
    }

    .product-header a{
        margin-top: 20px;
    }

    img{
        width : 80%;
        max-width : 600px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    div#product-infos-command {
        display: flex;
        justify-content: space-between;

    }
    
    div#Product-infos-command-price{
        display: block;
        margin-top: auto;
        margin-bottom: auto;
    }

    div#Product-infos-command-price p{
        font-size: 100%;
        font-weight: bold;
        margin: 10px;
    }

    #Product-add-cart-btn{
        width: 100%;
    }

    #Product-add-cart-btn svg{
        margin: 10px;
    }

   
    
`

