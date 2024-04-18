import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
import { UserContext } from "../../contexts/UserContext";
import { signOutUser } from "../../utils/firebase/firebase";

const NavBar = () => {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);
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
                ? <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                : <Link className="nav-link" to="/auth">
                    SIGN IN
                  </Link>  
            }
        </div>
      </div>
      <Outlet />
    </Fragment>
    )
}

export default NavBar;