// This is a general UI element that wraps some content - order summary
import React from "react";

import classes from "./Modal.module.css";

const modal = (props) => (
    <div className={classes.Modal}>
        {props.children}
    </div>
);

export default modal;