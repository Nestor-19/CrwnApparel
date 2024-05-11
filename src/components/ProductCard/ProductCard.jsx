import './ProductCard.styles.scss';
import Button from '../Button/Button';
import { addItemToCart } from '../../store/cart/cartSlice';
import { useDispatch } from 'react-redux';

const ProductCard = ({product}) => {
    const {imageUrl, name, price} = product;
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(product));

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
        </div>
    )
}

export default ProductCard;
