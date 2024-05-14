import './PaymentForm.styles.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotal, selectCartItems } from '../../store/cart/cartSelector';
import { selectCurrentUser } from '../../store/user/userSelector';
import { clearAllItemsFromCart } from '../../store/cart/cartSlice';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../Button/Button';

const PaymentForm = () => {
    const dispatch = useDispatch();
    const amount = useSelector(selectCartTotal);
    const user = useSelector(selectCurrentUser);
    const cartItems = useSelector(selectCartItems);
    const stripe = useStripe();
    const elements = useElements();
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        setIsPaymentProcessing(true);

        const response = await fetch('/.netlify/functions/createPayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());
        
        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user ? user.displayName : 'Guest'
                }
            }
        });

        setIsPaymentProcessing(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else{
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successfull!');
                dispatch(clearAllItemsFromCart(cartItems));
            }
        }
    }

    return (
        <div className='payment-form-container'>
            <form className='form-container' onSubmit={handlePayment}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button isLoading={isPaymentProcessing} buttonType="inverted" className='payment-button'>Pay Now</Button>
            </form>
        </div>
    )
}

export default PaymentForm;