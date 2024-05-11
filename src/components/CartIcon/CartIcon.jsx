import {ReactComponent as ShoppingCartIcon} from '../../assets/shopping-bag.svg'
import './CartIcon.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cartSlice';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cartSelector';

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const handleClick = () => dispatch(setIsCartOpen(!isCartOpen));
    
    return (
        <div className='cart-icon-container' onClick={handleClick}>
            <ShoppingCartIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;
