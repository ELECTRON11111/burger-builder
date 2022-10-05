import React from "react";

import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {
    componentDidUpdate() {
        // This shows us how many times this is updated and is re-rendered. To plan App Optimization
        console.log("[OrderSummary.js] componentDidUpdate");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
            return (
                <li key={igkey}>
                    <span style={{textTransform: "capitalize"}}>{igkey}</span>:{this.props.ingredients[igkey]}
                </li>
                );
        });

        // <li>Salad: 1</li>

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following Ingredients</p>
    
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType = "Danger" clicked={this.props.cancelled}>CANCEL</Button>
                <Button btnType = "Success" clicked={this.props.continued}>CONTINUE</Button>
            </Auxiliary>
        );
    }
    
}

export default OrderSummary;