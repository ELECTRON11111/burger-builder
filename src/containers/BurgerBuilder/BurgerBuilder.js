import React,{Component} from "react";

import Auxiliary from "../../hoc/Auxiliary";

class BurgerBuilder extends Component{
    render() {
        return (
            <Auxiliary>
                <div>Graphic rep of the burger</div>
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;