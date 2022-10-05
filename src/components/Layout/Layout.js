import React from "react";

import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState({showSideDrawer: true});
    }

    sideDrawerClosedHandler = () => {
        // the parameters for the set state function below are prevState and props
        this.setState((prevState , _) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    }

    render() {
        return (
            <Auxiliary>
                {/* This div should contain the Toolbar, backdrop or Sidedrawer */}
                {/* <div>Toolbar, Sidedrawer, Backdrop</div> */}
                <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/> 
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} 
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    };
}

export default Layout;