import './CheckoutItem.styles.scss'
import { addItemToCart, removeItemFromCart, clearItemFromCart} from '../../store/cart/cartSlice';
import { useDispatch } from "react-redux";

const CheckoutItem = ({checkoutItem}) => {
    const dispatch = useDispatch();
    const {name, quantity, imageUrl, price} = checkoutItem;

    const addItemHandler = () => dispatch(addItemToCart(checkoutItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(checkoutItem));
    const clearItemHandler = () => dispatch(clearItemFromCart(checkoutItem));

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'> {price}</span>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
    </div>
    )
}

export default CheckoutItem;
