import styled from "styled-components";


export const StyledNavBar = styled.div`

    .NavBar {
        background-color: #F6F3F0 !important;
        color: #AD0505 !important;
    }
    
    #NavBar-Menu, #NavBar-Web-Menu nav{
        justify-content: space-between;
    }
    
    #NavBar-Web-Menu{
        width: 85%;
    }
    
    #NavBar-Web-Menu nav,  #NavBar-Web-Menu nav ul{
        display: flex;
    }
    
    #NavBar-Web-Menu nav ul{
        justify-content: center;
    }
    
    #NavBar-Web-Menu nav ul li {
        list-style: none;
    }
    
    ul#NavBar-Web-Menu-left{
        margin-top:auto;
        margin-bottom:auto;
    }
    
    ul#NavBar-Web-Menu-left li{
        margin-left: 10px;
    }
    
    ul#NavBar-Web-Menu-right a, ul#NavBar-Web-Menu-right a div{
        width: 100%;
    }
    
    ul#NavBar-Web-Menu-right li{
        text-align: center;
    }
    
    ul#NavBar-Web-Menu-right div {
        margin-top: 0px;
        margin-bottom: 0px;
    }
    
    ul#NavBar-Web-Menu-right li{
        margin-left: 10px;
        margin-right: 10px;
    }
    
    ul#NavBar-Web-Menu-right svg{
        display: block;
        margin: auto;
    }
    
`

