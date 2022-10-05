// This is a general UI element that wraps some content - order summary
import React from "react";

import classes from "./Modal.module.css";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../UI/Backdrop/Backdrop";

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    componentDidUpdate() {
        // This shows us how many times this is updated and is re-rendered. To plan App Optimization
        console.log("[modal.js] componentDidUpdate");
    }

    render() {
        return (
            <Auxiliary>
                <Backdrop show = {this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show? "translateY(0)": "translateY(-100vh)",
                        opacity: this.props.show? "1": "0"
                    }}
                >
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}  

export default Modal;