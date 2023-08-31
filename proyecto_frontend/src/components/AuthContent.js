// AuthContent.js
import React, { Component } from 'react';
import { request } from './axios.helper';
import ItemDetailsModal from './ItemDetailsModal';

class AuthContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            filterState: '',
            selectedItem: null,
            showModal: false,
            selectedItemDetails: null,
            loadingDetails: false,
            showCreateForm: false, 
            newItem: {
                item_code: '',
                description: '',
                price: '',
                state: '',
            },
        };
    };

    openModal = (item) => {
        this.setState({ selectedItem: item, showModal: true });
        this.loadSelectedItemDetails(item);
    };

    closeModal = () => {
        this.setState({ selectedItem: null, showModal: false });
    };

    loadSelectedItemDetails = (item) => {
        this.setState({ loadingDetails: true });
        console.log("llega " + item.item_id + " "+ this.state.selectedItem +  this.state.showModal);
        // Realizar una solicitud para obtener los detalles del item
        request('GET', `/itemSuppliers/${item.item_id}`)
            .then((response) => {
                this.setState({ selectedItemDetails: response.data, loadingDetails: false });
            })
            .catch((error) => {
                console.error('Error fetching item details:', error);
                this.setState({ loadingDetails: false });
            });
    };
    fetchItemList(){
        request(
            "GET",
            "/allItems",
            {}
        ).then((response) => {
            this.setState({data : response.data})
        });
    }

    componentDidMount(){
        this.fetchItemList();
    };

    handleFilterStateChange = (event) => {
        this.setState({ filterState: event.target.value });
    };
     // Método para manejar la apertura del formulario de creación de nuevo item
     handleOpenCreateForm = () => {
        this.setState({ showCreateForm: true });
    };

    // Método para manejar el cierre del formulario de creación de nuevo item
    handleCloseCreateForm = () => {
        this.setState({ showCreateForm: false });
    };
    handleCreateNewItem = () => {
        const { newItem } = this.state;
    
        // Verificar que los campos obligatorios estén completos antes de enviar la solicitud
        if (!newItem.item_code || !newItem.description || !newItem.price) {
            alert('Please fill in all required fields.');
            return;
        }
        newItem.state = 'Activo';

            request(
            "POST",
            "/creates",
            newItem)
            .then(response => {
                console.log('New item created:', response.data);
                this.fetchItemList();

                // Puedes realizar acciones adicionales después de crear el nuevo item
            })
            .catch(error => {
                console.error('Error creating new item:', error);
                // Maneja el error de manera adecuada, como mostrando un mensaje de error al usuario
            });
            this.setState({
                showCreateForm: false,
                newItem: {
                    item_code: '',
                    description: '',
                    price: '',
                    state: '',
                },
            });
    };
    
    handleNewItemChange = (field, value) => {
        this.setState((prevState) => ({
            newItem: {
                ...prevState.newItem,
                [field]: value
            }
        }));
    };
    


    render(){
        
        const { data, filterState, showModal, selectedItem, showCreateForm, newItem  } = this.state;
        const filteredData = data.filter((item) =>
            filterState === '' || item.state === filterState
        );
        return(
            <div className='row justify-content-md-center'>
                {showCreateForm && (
                    <div className='col-md-8 mt-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Create New Item</h5>
                                <form>
                                    {/* Agrega aquí los campos del formulario para crear un nuevo item */}
                                    {/* Por ejemplo: */}
                                    <div className='mb-3'>
                                        <label htmlFor='item_code' className='form-label'>
                                            Item Code
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='item_code'
                                            value={newItem.item_code}
                                            onChange={(e) => this.handleNewItemChange('item_code', e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='description' className='form-label'>
                                            Description
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='description'
                                            value={newItem.description}
                                            onChange={(e) => this.handleNewItemChange('description', e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='price' className='form-label'>
                                            Price
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='price'
                                            value={newItem.price}
                                            onChange={(e) => this.handleNewItemChange('price', e.target.value)}
                                        />
                                    </div>
                                    {/* ... otros campos ... */}
                                    <button
                                        type='button'
                                        className='btn btn-primary'
                                        onClick={this.handleCreateNewItem}
                                    >
                                        Create
                                    </button>
                                    <button
                                        type='button'
                                        className='btn btn-secondary'
                                        onClick={this.handleCloseCreateForm}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <div className='col-md-8'>
                    <div className='card' >
                        <div className='card-body'>
                            <h5 className='card-title'>Items:</h5>
                            <div className='col-md-8 mt-3'>
                    <button className='btn btn-success' onClick={this.handleOpenCreateForm} style={{marginBlockEnd:'10px'}}>
                        Create New Item
                    </button>
                </div>
                            <div className='mb-3'>
                                <select
                                    className='form-select'
                                    value={filterState}
                                    onChange={this.handleFilterStateChange}
                                >
                                    <option value=''>All</option>
                                    <option value='Activo'>Activo</option>
                                    <option value='Inactivo'>Inactivo</option>
                                </select>
                            </div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Item code</th>
                                        <th>Description</th>
                                        <th>State</th>
                                        <th>Price</th>
                                        <th>Creation date</th>
                                        <th>User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map(item => (
                                        <tr key={item.item_id}>
                                            <td>{item.item_code}</td>
                                            <td>{item.description}</td>
                                            <td>{item.state}</td>
                                            <td>{item.price}</td>
                                            <td>{new Date(item.creation_date).toLocaleDateString()}</td>
                                            <td>{item.user.username}</td>
                                            <td>
                                                <button onClick={() => this.openModal(item)}>Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                {showModal && selectedItem && (
                    <ItemDetailsModal
                        show={showModal}
                        onHide={this.closeModal}
                        selectedItem={selectedItem}
                        selectedItemDetails={this.state.selectedItemDetails}
                        loadingDetails={this.state.loadingDetails}
                    />
                )}
            </div>
        );
    };
}

export default AuthContent;
