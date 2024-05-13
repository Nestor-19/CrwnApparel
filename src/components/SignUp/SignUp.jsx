import { useState } from "react";
import './SignUp.styles.scss';
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { createUserWithEmailAndPass,  createUserDocument} from "../../utils/firebase/firebase";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        } 

        try {
            const { user } = await createUserWithEmailAndPass(
                email,
                password
              );
              
              await createUserDocument(user, { displayName });
              resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user with existing email');
            } else {
                console.log('error creating user', error.message);
            }
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleEvent = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    inputOptions = {{
                        type: "text",
                        required: true,
                        onChange: handleEvent,
                        name: "displayName",
                        value: displayName
                    }}
                />
                <FormInput 
                    label="Email"
                    inputOptions = {{
                        type: "email",
                        required: true,
                        onChange: handleEvent,
                        name: "email",
                        value: email
                    }}
                />
                <FormInput 
                    label="Password"
                    inputOptions = {{
                        type: "password",
                        required: true,
                        onChange: handleEvent,
                        name: "password",
                        value: password
                    }}
                />
                <FormInput 
                    label="Confirm Password"
                    inputOptions = {{
                        type: "password",
                        required: true,
                        onChange: handleEvent,
                        name: "confirmPassword",
                        value: confirmPassword
                    }}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;