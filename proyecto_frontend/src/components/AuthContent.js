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
            loadingDetails: false
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
                console.log('Item details:', response.data); // Agregar este console.log
                this.setState({ selectedItemDetails: response.data, loadingDetails: false });
            })
            .catch((error) => {
                console.error('Error fetching item details:', error);
                this.setState({ loadingDetails: false });
            });
    };

    componentDidMount(){
        request(
            "GET",
            "/allItems",
            {}
        ).then((response) => {
            this.setState({data : response.data})
        });
    };

    handleFilterStateChange = (event) => {
        this.setState({ filterState: event.target.value });
    };

    render(){
        
        const { data, filterState, showModal, selectedItem } = this.state;
        const filteredData = data.filter((item) =>
            filterState === '' || item.state === filterState
        );
        return(
            <div className='row justify-content-md-center'>
                <div className='col-md-8'>
                    <div className='card' >
                        <div className='card-body'>
                            <h5 className='card-title'>Items:</h5>
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
