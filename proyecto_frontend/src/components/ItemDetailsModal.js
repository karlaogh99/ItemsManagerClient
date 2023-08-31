// ItemDetailsModal.js
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ItemDetailsModal extends Component {
    render() {
        const { show, onHide, selectedItem, selectedItemDetails, loadingDetails } = this.props;
 
        if (!selectedItem) {
            return null;
        }

        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!loadingDetails && selectedItemDetails && (
                        <div>
                            <h4>Item Code: {selectedItem.item_code}</h4>
                            <p>Description: {selectedItem.description}</p>
                            <p>State: {selectedItem.state}</p>
                            <p>Price: {selectedItem.price}</p>
                            <p>Creation Date: {new Date(selectedItem.creation_date).toLocaleDateString()}</p>
                            <p>User ID: {selectedItem.user.username}</p>
                            <h5>Suppliers:</h5>
                            <ul>
                            {selectedItemDetails.map((supplierDetails) => (
                                <li key={supplierDetails.supplier_id}>
                                Supplier ID: {supplierDetails.supplier_id}, Name: {supplierDetails.name}, Country: {supplierDetails.country}
                            </li>
                            ))}

                            </ul>
                            <h5>Price Reductions:</h5>
                            <ul>
                                {selectedItem.priceReductions.map((reduction) => (
                                    <li key={reduction.priceReduction_id}>
                                        Reduced Price: {reduction.reducedPrice}
                                        <br />
                                        Start Date: {new Date(reduction.startDate).toLocaleDateString()}
                                        <br />
                                        End Date: {new Date(reduction.endDate).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {loadingDetails && <p>Loading item details...</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ItemDetailsModal;
