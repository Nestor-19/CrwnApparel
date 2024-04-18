import { useContext } from 'react';
import {ReactComponent as ShoppingCartIcon} from '../../assets/shopping-bag.svg'
import './CartIcon.styles.scss';
import { CartContext } from '../../contexts/CartContext';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    
    const handleClick = () => setIsCartOpen(!isCartOpen);
    
    return (
        <div className='cart-icon-container' onClick={handleClick}>
            <ShoppingCartIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;
