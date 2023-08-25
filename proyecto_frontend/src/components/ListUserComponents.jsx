import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUserComponents extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount(){
        UserService.getUsers().then((res)=> {
            this.setState({users:res.data});
        });
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>User List</h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user => 
                                    <tr key={user.user_id}>
                                        <td>{user.username}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListUserComponents;