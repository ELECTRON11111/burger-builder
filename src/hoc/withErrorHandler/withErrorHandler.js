import React, { Component } from "react";

import Modal from "../../components/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    // Return an anonymous class which returns lsx
    return class extends Component{
        componentDidMount() {
            // Here we set up our global interceptors
            axios.interceptors.request.use(req => {
                // clear any existing errors in the state
                this.setState({error: null});
                // Remember when we use interceptors, we must always return the request/response
                return req;
            });
            
            axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({error: error});
                // Remember when we use interceptors, we must always return the Promise.reject(error) to handle the error
                return Promise.reject(error);
            });   
        }
        
        state = {
            error: false
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
 
        render() {
            return (
                <Auxiliary>
                    {/* The Modal has a high z-index, so it's is placed above the wrappedComponent */}
                    <Modal 
                        show = {this.state.error}
                        modalClosed = {this.errorConfirmedHandler}
                    > 
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
}

export default withErrorHandler;