import React,{Component} from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3, 
    bacon: 0.7
}
class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (updatedIngredients) => {
        const igs = {...updatedIngredients};
        const values = Object.values(igs);

        const sum = values.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        // Ensure state immutability
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        // Also update total price
        let newTotal = this.state.totalPrice;
        newTotal += INGREDIENT_PRICES[type]
        this.setState({ingredients: updatedIngredients, totalPrice: newTotal});

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        
        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;

        // Ensure state immutability
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        // Also update total price
        let newTotal = this.state.totalPrice;
        newTotal -= INGREDIENT_PRICES[type]
        this.setState({ingredients: updatedIngredients, totalPrice: newTotal});

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        // set state can take prevState and props
        // this.setState((prevState, _) => {
        //     return {purchasing: !prevState.purchasing}
        // });

        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("You Continued!");
        const order = {
            ingredients: this.state.ingredients,
            customer: {
                name: "Omoniyi Daniel",
                address: {
                    street: "TestStreet 1",
                    zipCode: "3442943",
                    country: "Nigeria"
                },
                deliveryMethod: "fastest"
            }, 
            price: this.state.totalPrice.toFixed(2) // in a real app, this shouldn't be done here, should be recalculated on the server.
        }

        // send the order data to the backend
        // if we add "/orders.json" to the backend, what firebase does is that it creates a node for those and stores each child element under it.
        // So for any endpoint name of your choice with firebase, you add .json
        axios.post("/orders.json", order)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // {salad: true, cheese: false, ...}
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed= {this.purchaseCancelHandler}>
                    <OrderSummary 
                        price = {this.state.totalPrice}
                        ingredients = {this.state.ingredients}
                        cancelled = {this.purchaseCancelHandler}
                        continued = {this.purchaseContinueHandler}    
                    />
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    ordered = {this.purchaseHandler} 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice.toFixed(2)}
                    purchasable = {this.state.purchasable}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;