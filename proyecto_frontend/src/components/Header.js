import * as React from 'react';

export default function Header(props){
    return(
        <header className='App-header'>
            <img src={props.logoSrc} className="App-logo" alt="logo"/>
            <div className='header-content'>
                <h1 className='App-title'>{props.pageTitle}</h1>
            </div>
        </header>

    );


}