import './PaymentForm.styles.scss';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../Button/Button';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

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
            body: JSON.stringify({ amount: 10000 })
        }).then(res => res.json());
        
        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Nestor Dsouza'
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