import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
import { signOutUser } from "../../utils/firebase/firebase";
import CartIcon from "../../components/CartIcon/CartIcon";
import DropDown from "../../components/DropDown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import { selectIsCartOpen } from "../../store/cart/cartSelector";
import { signOut } from "../../store/user/userAction";


const NavBar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const handleSignOut = () => {
      dispatch(signOut());
    }

    return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
            <CrownLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            {currentUser
                ? <span className="nav-link" onClick={handleSignOut}>SIGN OUT</span>
                : <Link className="nav-link" to="/auth">
                    SIGN IN
                  </Link>  
            }
            <CartIcon />
        </div>
        {isCartOpen && <DropDown />}
      </div>
      <Outlet />
    </Fragment>
    )
}

export default NavBar;
