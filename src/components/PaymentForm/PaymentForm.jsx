import './PaymentForm.styles.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cartSelector';
import { selectCurrentUser } from '../../store/user/userSelector';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../Button/Button';

const PaymentForm = () => {
    const amount = useSelector(selectCartTotal);
    const user = useSelector(selectCurrentUser);
    const stripe = useStripe();
    const elements = useElements();
    console.log(amount, user);

    const handlePayment = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

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

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else{
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successfull!');
            }
        }
    }

    return (
        <div className='payment-form-container'>
            <form className='form-container' onSubmit={handlePayment}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button buttonType="inverted" className='payment-button'>Pay Now</Button>
            </form>
        </div>
    )
}

export default PaymentForm;