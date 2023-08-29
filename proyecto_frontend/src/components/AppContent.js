import * as React from 'react';
import WelcomeContent from './WelcomeContent.js';
import AuthContent from './AuthContent.js';
import LoginForm from './LoginForm.js';
import Buttons from './Buttons.js';

import { request, setAuthToken } from './axios.helper.js';

export default class AppContent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            componentToShow: "welcome"
        };
    };
    login = () => {
        this.setState({componentToShow: "login"});
    };
    logout = () => {
        this.setState({componentToShow: "welcome"});
    };
    onLogin = (e, username, password) => {
        e.preventDefault();
        request("POST",
                "/auth/login",
                {username: username, password: password}
                ).then((response) => {
                    this.setState({componentToShow: "messages"});
                    setAuthToken(response.data.token)
                }).catch((error) => {
                    this.setState({componentToShow: "welcome"});
                });
    };
    onRegister = (e, username, password) => {
        e.preventDefault();
        request("POST",
                "/auth/register",
                {
                    username: username, 
                    password: password}
                ).then((response) => {
                    this.setState({componentToShow: "messages"});
                }).catch((error) => {
                    this.setState({componentToShow: "welcome"});
                });
    };

    render(){
        return(
            <div>
                <Buttons login={this.login} logout={this.logout}
                />
                {this.state.componentToShow === "welcome" && <WelcomeContent/>}
                {this.state.componentToShow === "messages" && <AuthContent/>}
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister}/>} 
            </div>
        );

    };

}