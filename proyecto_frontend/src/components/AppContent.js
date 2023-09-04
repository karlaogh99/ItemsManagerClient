import * as React from 'react';
import WelcomeContent from './WelcomeContent.js';
import AuthContent from './AuthContent.js';
import LoginForm from './LoginForm.js';
import ButtonLogin from './Buttons_login.js';
import ButtonLogout from './Buttons_logout.js';
import UserManagement from './UserManagement.js' ;
import { request, setAuthToken } from './axios.helper.js';
import CheapestItems from './CheapestItems.js';

export default class AppContent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            componentToShow: "welcome",
            rol:""
        };
    };
    login = () => {
        this.setState({componentToShow: "login"});
    };
    logout = () => {
        this.setState({componentToShow: "welcome"});
    };
    comprobar = (username) => {
        request("POST",
                "/auth/admin",{username:username})
                .then((response) => {

                    if(response.data =="user"){
                        this.setState({rol: "user"});
                        this.setState({componentToShow: "user"});
                    }else{
                        this.setState({rol: "admin"});
                        this.setState({componentToShow: "messages"});
                    }
                    
                }).catch((error) => {
                    this.setState({componentToShow: "user"});
                });       
    }
    onLogin = (e, username, password) => {
        e.preventDefault();
        request("POST",
                "/auth/login",
                {username: username, password: password}
                ).then((response) => {
                    setAuthToken(response.data.token);
                    this.comprobar(username);


                //    this.setState({componentToShow: "messages"});
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
                    setAuthToken(response.data.token);
                    this.setState({componentToShow: "user"});
                    
                }).catch((error) => {
                    this.setState({componentToShow: "welcome"});
                });
    };
    updateComponentToShow = (component) => {
        this.setState({ componentToShow: component });
      }

    render(){
        return(
            <div>

                {this.state.componentToShow === "welcome" ? <ButtonLogin login={this.login}/> : <ButtonLogout logout={this.logout}/> }
                {this.state.componentToShow === "welcome" && <WelcomeContent/>}
                {this.state.componentToShow === "user" && <AuthContent updateComponentToShow={this.updateComponentToShow} rol={this.state.rol}/>}
                {this.state.componentToShow === "messages"  && (
                    <UserManagement updateComponentToShow={this.updateComponentToShow} rol={this.state.rol} />
                )}
                {this.state.componentToShow === "cheap" && <CheapestItems updateComponentToShow={this.updateComponentToShow} rol={this.state.rol} /> }

                {this.state.componentToShow === "login" && ( 
                    <LoginForm updateComponentToShow={this.updateComponentToShow}  onLogin={this.onLogin} onRegister={this.onRegister}/>
                )} 
            </div>
        );

    };

}