import styled from "styled-components";


export const StyledFooter = styled.div`


    .footer {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        font-weight: bold;
    }
    
    .footer-social-media {
        display: block;
        text-align: center;
        margin-bottom: 20px;
    }

    .footer-social-media a{
        font-size: 12px;
        margin-left: 15px;
    }

    .footer-social-media div{
        display: flex;
        justify-content: center;
    }

    .footer-social-media img{
        margin-top: auto;
        margin-bottom: auto;
        width: 15px;
        heidht: 15px;
    }
    
    .footer-social-media__icon {
        margin: 0px 4px;
        width: 25px;
        height: 25px;
    }
    
    .footer-info  {
        display: flex;
        justify-content: center;
    }
    
    .footer-info-left, .footer-info-center, .footer-info-right {
        font-size: x-small;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        width: 30%;
    }
    
    .footer-info__name{
        margin-bottom: 10px;
    }
    
    .footer-info__name, .footer-info__returns {
        text-align: start;
    }
    
    .footer-info__terms {
        text-align: center;
    }
    
    .footer-info__contact {
        text-align: end;
    }
    
    .footer-date {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    
    .footer-seperator {
        flex-grow: 1;
        border: none;
        height: 1px;
        background-color: black;
        width: 100%;
    }
    
    .footer-name {
        display: flex;
        justify-content: center;
    }
    
    .footer-bottom__name {
        text-transform: uppercase;
        font-family: RobotoBold;
        font-size: large;
        margin: 0px 20px;
    }


`