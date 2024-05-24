import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import {ReactComponent as CrownLogo} from '../../assets/crownLogo.svg'
import './navigation.styles.scss'
import CartIcon from "../../components/CartIcon/CartIcon";
import DropDown from "../../components/DropDown/DropDown";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import { selectIsCartOpen } from "../../store/cart/cartSelector";
import { signOutUser } from "../../utils/firebase/firebase";


const NavBar = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
            <CrownLogo className="logo"/>
            {/* <img src={crown} alt="Crown Logo" className="logo" /> */}
        </Link>
        <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            {currentUser
                ? <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
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
