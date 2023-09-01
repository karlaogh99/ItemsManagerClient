// AuthContent.js
import React, { Component } from 'react';
import { request } from './axios.helper';
import ItemDetailsModal from './ItemDetailsModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PriceReductionForm from './PriceReductionForm';
import Modal from 'react-bootstrap/Modal';
import InactiveDetails from './InactiveDetails';

class AuthContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            filterState: '',
            availableSuppliers: [],
            selectedItem: null,
            showModal: false,
            selectedItemDetails: null,
            loadingDetails: false,
            showCreateForm: false,
            showPriceReductionForm: false, 
            selectedItemIdForPriceReduction: null, 
            showInactiveDetails: false,
            showModalInactive:false,
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
    fetchSupplierList() {
        request(
            "GET",
            "/allSupplier",
            {}
        ).then((response) => {
            this.setState({ availableSuppliers: response.data });
        });
    }
    componentDidMount(){
        this.fetchItemList();
        this.fetchSupplierList();
    };

    handleFilterStateChange = (event) => {
        this.setState({ filterState: event.target.value });
    };
     // Método para manejar la apertura del formulario de creación de nuevo item
     handleOpenCreateForm = () => {
        this.setState({ showCreateForm: true });
    };
    handleOpenInactiveDetails = () => {
        this.setState({ showInactiveDetails: true });
      };
      handleOpenModalInactive = () => {
        this.setState({ showModalInactive: true });
      };
    
      // Función para cerrar el modal
      handleCloseModalInactive = () => {
        this.setState({ showModalInactive: false });
        this.fetchItemList();
        this.fetchSupplierList();
      };

    // Método para manejar el cierre del formulario de creación de nuevo item
    handleCloseCreateForm = () => {
        this.setState({ showCreateForm: false });
    };
    handleOpenPriceReductionModal = (item_id) => {
        this.setState({
            showPriceReductionModal: true,
            selectedItemIdForPriceReduction: item_id,
        });
    };

    // Función para cerrar el modal de reducción de precio
    handleClosePriceReductionModal = () => {
        this.setState({
            showPriceReductionModal: false,
            selectedItemIdForPriceReduction: null,
        });
        this.fetchItemList();
        this.fetchSupplierList();
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
    
handleEditItem = (item) => {
        // Abre el formulario de edición y carga los valores del elemento en los campos
        this.setState({
            showEditForm: true,
            editedItem: {
                item_id: item.item_id,
                item_code: item.item_code,
                description: item.description,
                price: item.price,
                state: item.state,
                creation_date:item.creation_date,
                user_id:item.user_id,

            },
        });
    };
    handleEditItemChange = (field, value) => {
        const { editedItem } = this.state;

        // Crea una copia del editedItem y actualiza el campo correspondiente
        const updatedItem = { ...editedItem, [field]: value };

        // Actualiza el estado con el nuevo editedItem modificado
        this.setState({ editedItem: updatedItem });
    };
    handleCloseEditForm = () => {
        this.setState({
            showEditForm: false,
            editedItem: null,
        });
    };
    handleUpdateItem = () => {
        const { editedItem } = this.state;

        // Realiza la solicitud PUT para actualizar el elemento
        request("PUT", `/updateitems/${editedItem.item_id}`, editedItem)
            .then(response => {
                console.log('Item updated:', response.data);
                // Actualiza la lista de elementos después de editar
                this.fetchItemList();
                // Cierra el formulario de edición
                this.setState({
                    showEditForm: false,
                    editedItem: null,
                });
            })
            .catch(error => {
                console.error('Error updating item:', error);
                // Maneja el error de manera adecuada, como mostrando un mensaje de error al usuario
            });
    };
    openSupplierModal = item => {
        this.fetchSupplierList();
        // Obtén la lista de proveedores disponibles que aún no están asociados a este artículo
        request('GET', `/itemSuppliers/${item.item_id}`)
        .then((response) => {
            //const alreadyAssociatedSupplierIds = response.data;
        const alreadyAssociatedSupplierIds = response.data.map(supplier => supplier.supplier_id);

        const availableSuppliers = this.state.availableSuppliers.filter(
            supplier => !alreadyAssociatedSupplierIds.includes(supplier.supplier_id)
        );


            this.setState({
                selectedItem: item,
                showSupplierModal: true,
                availableSuppliers: availableSuppliers,
                selectedSupplier: null,
            });
        });    
    };

    closeSupplierModal = () => {
        this.setState({
            selectedItem: null,
            showSupplierModal: false,
            availableSuppliers: [],
            selectedSupplier: null,
        });
    };

    handleSupplierChange = event => {
        this.setState({ selectedSupplier: event.target.value });
    };
    handleAssociateSupplier = () => {
        const { selectedItem, selectedSupplier } = this.state;

        if (!selectedSupplier) {
            alert('Please select a supplier.');
            return;
        }
        // Realiza la solicitud para asociar el proveedor al artículo
        request('POST', `/associateSupplier/${selectedItem.item_id}/${selectedSupplier}`)
            .then(response => {
                console.log('Supplier associated:', response.data);
                // Actualiza la lista de elementos después de asociar el proveedor
                this.fetchItemList();
                // Cierra el modal de proveedores
                this.closeSupplierModal();
            })
            .catch(error => {
                console.error('Error associating supplier:', error);
                // Maneja el error de manera adecuada, como mostrando un mensaje de error al usuario
            });
    };
    


    render(){
        
        const { data, filterState, showModal, selectedItem, showCreateForm, newItem, 
            showEditForm, editedItem,showSupplierModal, availableSuppliers, selectedSupplier,showInactiveDetails  } = this.state;
        const filteredData = data.filter((item) =>
            filterState === '' || item.state === filterState
        );
        return(
            <div className='row justify-content-md-center'>
                <Modal show={this.state.showModalInactive} onHide={this.handleCloseModalInactive}>
    <Modal.Header closeButton>
        <Modal.Title>Deactivate Item</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <InactiveDetails
            item_id={this.state.editedItem}
            onClose={this.handleCloseModalInactive}
        />
    </Modal.Body>
    <Modal.Footer>
        <button variant='secondary' onClick={this.handleCloseModalInactive}>
            Close
        </button>
    </Modal.Footer>
</Modal>
                <Modal show={this.state.showPriceReductionModal} onHide={this.handleClosePriceReductionModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Price Reduction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PriceReductionForm
                    item_id={this.state.selectedItemIdForPriceReduction}
                    //existingReductions={/* Pasa aquí las reducciones de precio existentes para verificar superposición */}
                    onClose={this.handleClosePriceReductionModal}
                />
            </Modal.Body>
        </Modal>
                
                {showSupplierModal && selectedItem && (
                    <div className='col-md-8 mt-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Add Supplier</h5>
                                <form>
                                    <div className='mb-3'>
                                        <label htmlFor='supplier' className='form-label'>
                                            Select Supplier:
                                        </label>
                                        <select value={selectedSupplier} onChange={this.handleSupplierChange}>
                                            <option value=''>Select Supplier</option>
                                            {availableSuppliers.map(supplier => (
                                                <option key={supplier.supplier_id} value={supplier.supplier_id}>
                                                    {supplier.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        type='button'
                                        className='btn btn-primary'
                                        onClick={this.handleAssociateSupplier}
                                    >
                                        Associate Supplier
                                    </button>
                                    <button
                                        type='button'
                                        className='btn btn-secondary'
                                        onClick={this.closeSupplierModal}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {showEditForm && (
                    <div className='col-md-8 mt-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Edit Item</h5>
                                <form>
                                    <div className='mb-3'>
                                        <label htmlFor='description' className='form-label'>
                                            Description
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='description'
                                            value={editedItem.description}
                                            onChange={(e) => this.handleEditItemChange('description', e.target.value)}
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
                                            value={editedItem.price}
                                            onChange={(e) => this.handleEditItemChange('price', e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <button
                                        type='button'
                                        className='btn btn-primary'
                                        onClick={this.handleUpdateItem}
                                        
                                    >
                                        Update
                                    </button>
                                    <button
                                        type='button'
                                        className='btn btn-secondary'
                                        style={{margin:'10px'}}
                                        onClick={this.handleCloseEditForm}
                                    >
                                        Cancel
                                    </button>
                                    {editedItem.state === "Activo" ? <button
                                        type='button'
                                        className='btn btn-warning'
                                        onClick={this.handleOpenModalInactive}
                                    >
                                        Deactivate
                                    </button> : <div></div>}
                                </form>
                            </div>
                        </div>
                    </div>
                )}

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
                                                <button className='btn btn-outline-primary' onClick={() => this.openModal(item)}>Details</button>
                                            </td>
                                            <td>
                                                <button className='btn btn-outline-warning' onClick={() => this.handleEditItem(item)}> Edit</button>
                                            </td>
                                            <td>
                                                <button className = 'btn btn-outline-success' onClick={() => this.openSupplierModal(item)}>Add Supplier</button>
                                            </td>
                                            <td>
                                                <button className='btn btn-outline-primary' onClick={() =>  this.handleOpenPriceReductionModal(item.item_id)}>Add Price Reduction</button>
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
