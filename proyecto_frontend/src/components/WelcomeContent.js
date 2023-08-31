import React from 'react';

export default class WelcomeContent extends React.Component {
    render() {
        return (
            <div className='row justify-content-md-center'>
                <div className='col-md-8'>
                    <div className='jumbotron jumbotron-fluid bg-light'>
                        <div className='container text-center'>
                            <h1 className='display-4'>Welcome to Our Website</h1>
                            <p className='lead'>Explore our exciting content by logging in.</p>
                            <hr className='my-4' />
                            <p>Unlock a world of amazing features by joining our community.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}