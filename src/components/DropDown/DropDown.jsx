import Button from '../Button/Button';
import './DropDown.styles.scss';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cartSelector';
import { useSelector } from 'react-redux';

const DropDown = () => {
    const cartItems = useSelector(selectCartItems);

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