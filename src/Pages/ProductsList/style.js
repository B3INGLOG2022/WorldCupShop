import styled from "styled-components";


export const StyledProductsList = styled.div`

    
    .products-list-articles{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .products-list-articles-item{
        margin: 10px !important;
        width: auto;
        height: auto;
    }

    .products-list-header-sort-filtre{
        margin-right: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .products-list-header-filtre{
        margin-right: 20px;
        display: block;
        margin-top: auto;
        margin-bottom: auto;
    }

    .products-list-header-filtre p{
        margin-left: 5px;
        font-size: 14px;
        color: grey;
    }

    .products-list-header{
        background-Color: #F6F3F0;
        border-top: solid black 1px;
        border-bottom: solid black 1px;
    }

    .products-list-articles{
        max-width: 70%;
        margin-left: auto;
        margin-right: auto;
    }
    
    
`