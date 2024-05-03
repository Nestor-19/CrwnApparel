import './CheckoutItem.styles.scss'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cartAction";
import { selectCartItems } from "../../store/cart/cartSelector";
import { useDispatch, useSelector } from "react-redux";

const CheckoutItem = ({checkoutItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const {name, quantity, imageUrl, price} = checkoutItem;

    const addItemHandler = () => dispatch(addItemToCart(cartItems, checkoutItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, checkoutItem));
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, checkoutItem));

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
