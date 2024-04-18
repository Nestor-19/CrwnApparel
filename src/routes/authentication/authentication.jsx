import SignInForm from '../../components/SignIn/SignIn';
import SignUpForm from '../../components/SignUp/SignUp';
import './authentication.styles.scss'

const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;