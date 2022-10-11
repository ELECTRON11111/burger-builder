import React, { Component } from "react";

import Modal from "../../components/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    // Return an anonymous class which returns lsx
    return class extends Component{
        componentDidMount() {
            // Here we set up our global interceptors
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // clear any existing errors in the state
                this.setState({error: null});
                // Remember when we use interceptors, we must always return the request/response
                return req;
            });
            
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({error: error});
                // Remember when we use interceptors, we must always return the Promise.reject(error) to handle the error
                return Promise.reject(error);
            });   
        }

        // When this component is no longer in use, we have to remove the interceptors
        componentWillUnmount() {
            // This lifecycle hook is executed at the point in time where a component isn't required.
            // we do this by passing a reference to the interceptor into the axios eject() method
            console.log("component Unmount", this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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