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

    }

    return (
        <div className='payment-form-container'>
            <form className='form-container'>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button buttonType="inverted" className='payment-button'>Pay Now</Button>
            </form>
        </div>
    )
}

export default PaymentForm;