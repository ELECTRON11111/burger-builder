import React from "react";

import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
    return (
        <Auxiliary>
            {/* This div should contain the Toolbar, backdrop or Sidedrawer */}
            {/* <div>Toolbar, Sidedrawer, Backdrop</div> */}
            <Toolbar /> 
            <SideDrawer />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    )
}

export default layout;