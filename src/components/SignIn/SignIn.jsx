import { useState } from "react";
import { signInWithGoogleRedirect, createUserDocument, signInWithEmailAndPass } from "../../utils/firebase/firebase";

import './SignIn.styles.scss';
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPass(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-credential':
                  alert('incorrect email or password');
                  break;
                default:
                  console.log(error);
              }
        }
    }

    const signInWithGoogle = async () => {
        const response = await signInWithGoogleRedirect();
        console.log(response.user);
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
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    {/* google button is explicity labelled as type "button" to ensure that the form is not
                    triggered when user tries to sign in with google */}
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;