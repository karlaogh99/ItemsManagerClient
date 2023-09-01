import React, { Component } from 'react';
import { request } from './axios.helper';

class InactiveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleDeactivateItem = () => {
    request('POST', `/desactivateItem/${this.props.item_id.item_id}`, this.state.comment)
        .then((response) => {
            console.log('desactivateItem:', response.data);
            this.setState({ errorMessage: 'Realizado correctamete' });                        
        })
        .catch((error) => {
            console.error('Error al insertar la reducción de precio:', error);
        });

    // Realizar una solicitud al servidor para desactivar el elemento con el comentario
    // Puedes enviar itemId y comment al servidor aquí

    // Después de completar la solicitud, cierra el modal
  };

  render() {
    const { comment } = this.state;

    return (
        <div >
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Reason for the deactivation:</label>
                    <input
                        type="text"
                        onChange={this.handleCommentChange}
                        name="comment"
                        value={comment}
                        required
                    />
                </div>
                <button type="button" className="btn btn-danger" style={{margin:'20px'}} onClick={this.handleDeactivateItem}>
                Desactivate
                </button>
            </form>
        </div>
    );
    }
}
   


export default InactiveDetails;