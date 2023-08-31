import * as React from 'react';

export default function ButtonLogin(props){
    return(
        <div className='row'>
            <div className='col-md-12 text-end' style={{marginTop:'30px'}} >
                <button className='btn btn-primary btn-lg' style={{margin:'10px'}} onClick={props.login}>Login</button>
            </div>
        </div>
    );
};