import styled from "styled-components";


export const StyledSearchBar = styled.div`
    
    display: flex;
    height-max: 60px;
    justify-content: center;
    padding: 20px;

    .searchBar-productsList{
        flex: 1 1 auto;
        margin-left: 20px;
    }

    .searchBtn-productList{
        flex: auto 1 auto;
        display: block;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 20px;
    }

    .searchBtn-productList svg{
        border-radius: 5px;
        display: block;
        margin-top: auto;
        margin-bottom: auto;
        width: 40px;
        height: 40px;
    }
`