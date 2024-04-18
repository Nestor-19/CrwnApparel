import Button from '../Button/Button';
import './DropDown.styles.scss';
import CartItem from '../CartItem/CartItem';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

const DropDown = () => {
    const { cartItems } = useContext(CartContext)
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>))}
            </div>
            <Link to="/checkout">
                <Button>Go to Checkout</Button>
            </Link>
        </div> 
    )
}

export default DropDown;