import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            /** props.ingredients[igKey] gets the value for the igKey e.g 2
             * [...Array(no from the above)] e.g [...Array(2)] - ["",""]
             */
            return [...Array(props.ingredients[igKey])].map((_ , i) => {
                return <BurgerIngredient key={igKey + i} type = {igKey} />
            })
        });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type= "bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type= "bread-bottom"/>
        </div>
    )
}

export default burger;