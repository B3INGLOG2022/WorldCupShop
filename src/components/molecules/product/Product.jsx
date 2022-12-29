import {StyledProduct} from './style.js';
import { Rating } from '@mui/material';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';


export const Product = ({product, rate, nbFeedBack}) => {

    return (

        <StyledProduct>
            <Card className='product-item-card' sx={{backgroundColor: "#F6F3F0"}}>
                <img src={product.image.url} alt="article" />
                <h3>{product.categories[0].slug}</h3>
                <p>{product.name}</p>
                <div className="list-product-price-section">
                    <p>{product.price.formatted} €</p>
                </div>
                <div className="list-product-rating-section">
                    <Rating size="small" readOnly value={rate} />
                    <p>{nbFeedBack} avis</p>
                </div>
            </Card>
        </StyledProduct>
    )

}

Product.propTypes = {
    product: PropTypes.object,
};