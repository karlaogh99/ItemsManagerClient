import React, { Component } from 'react';
import { request } from './axios.helper';

class PriceReductionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            reducedPrice: '',
            errorMessage: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    checkDateOverlap = (startDate, endDate, existingReductions) => {
        return existingReductions.some((reduction) => {
            const reductionStartDate = new Date(reduction.startDate);
            const reductionEndDate = new Date(reduction.endDate);

            const newStartDate = new Date(startDate);
            const newEndDate = new Date(endDate);

            // Verificar si las fechas se superponen
            return (
                (startDate >= reductionStartDate && newStartDate <= reductionEndDate) ||
                (newEndDate >= reductionStartDate && newEndDate <= reductionEndDate) ||
                (newStartDate <= reductionStartDate && newEndDate >= reductionEndDate)
            );
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

    const { item_id } = this.props;
    const { startDate, endDate, reducedPrice } = this.state;
    if (typeof item_id !== 'number' || isNaN(item_id)) {
        // Manejar el caso en el que item_id no sea válido
        console.error('item_id no es un número válido:', item_id);
        return;
    }
    // Realizar una solicitud al backend para obtener las reducciones de precio existentes para el artículo
    request('GET', `/getPriceReductions/${item_id}`)
        .then((response) => {
            const existingReductions = response.data;
            if (this.checkDateOverlap(startDate, endDate, existingReductions)) {
                this.setState({ errorMessage: 'Las fechas se superponen con una reducción de precio existente.' });
            } else {
                const priceReductionData = {
                    item_id,
                    startDate,
                    endDate,
                    reducedPrice,
                };
                console.log(priceReductionData);
                request('POST', `/insertPriceReduction/${item_id}`, priceReductionData)
                    .then((response) => {
                        console.log('Reducción de precio insertada:', response.data);
                        this.setState({ errorMessage: 'Realizado correctamete' });
                    })
                    .catch((error) => {
                        console.error('Error al insertar la reducción de precio:', error);
                    });
            }
        })
        .catch((error) => {
            console.error('Error al obtener las reducciones de precio existentes:', error);
        });
    };

    render() {
        const { startDate, endDate, reducedPrice, errorMessage } = this.state;

        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={startDate}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={endDate}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price Reduction:</label>
                        <input
                            type="number"
                            name="reducedPrice"
                            value={reducedPrice}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button type="submit">Insert</button>
                </form>
            </div>
        );
    }
}

export default PriceReductionForm;
