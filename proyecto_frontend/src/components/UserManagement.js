import React, { Component } from 'react';
import { request } from './axios.helper'; // Importa tu función de solicitud AJAX
import './UserManager.css';
import AppContent from './AppContent';

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUser: {
        username: '',
        password: '',
        componentToShow: "UserManagement"
        // Otros campos de usuario
      },
    };
  }

  componentDidMount() {
    // Carga la lista de usuarios cuando el componente se monta
    this.fetchUsers();
  }

  fetchUsers() {
    // Realiza una solicitud para obtener la lista de usuarios
    request('GET', '/api/users')
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }

  handleInputChange = (event) => {
    // Actualiza el estado del nuevo usuario mientras se escribe
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        [name]: value,
      },
    }));
  };

  createUser = () => {
    // Realiza una solicitud para crear un nuevo usuario
    const { newUser } = this.state;
    request('POST', '/auth/register', newUser)
      .then((response) => {
        console.log('User created:', response.data);
        // Actualiza la lista de usuarios después de la creación
        this.fetchUsers();
        // Limpia el formulario
        this.setState({
          newUser: {
            username: '',
            password: '',
            // Limpia otros campos de usuario si es necesario
          },
        });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  deleteUser = (user_id) => {
    // Realiza una solicitud para eliminar un usuario por su ID
    request('DELETE', `/api/usersDele/${user_id}`)
      .then((response) => {
        this.fetchUsers();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };
  viewItem = () =>{
    this.props.updateComponentToShow("user");    

  }
  viewSQL = () =>{
    this.props.updateComponentToShow("cheap");    
}

  clearForm() {
    this.setState({
      newUser: {
        username: '',
        password: '',
      },
    });
  }

  render() {
    const { users, newUser } = this.state;

    return (
      <div className='esteDiv'>
        <h1>User Management</h1>
        <h2>Create New User</h2>
        <form>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="button" onClick={this.createUser}>
            Create User
          </button>
          <button type="button" style={{marginLeft:'30px'}} onClick={this.viewItem}>
            Item Management
          </button>
          <button className='button' onClick={this.viewSQL} style={{ marginLeft: '30px' }}>
            Info SQL 
          </button>
        </form>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>
                  <button type="button" onClick={() => this.deleteUser(user.user_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserManagement;
