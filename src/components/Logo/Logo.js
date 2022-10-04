import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

// When dealing with images, the SRC has to be dynamically placed in by webpack because webpack internally reconstructs the folder structure.
// So we have to import images like we import components
const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default Logo;