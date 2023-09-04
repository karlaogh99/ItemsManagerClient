import React, { Component } from 'react';
import { request } from './axios.helper';

class CheapestItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cheapestItems: [],
            assiociatedItems: [],
        };
    }
    componentDidMount() {
        this.fetchCheapestItems();
    }
    
    fetchCheapestItems() {
      request('GET', '/cheapestItem')
      .then((response) => {
        this.setState({ cheapestItems: response.data });
      })
      .catch((error) => {
        console.error('Error fetching cheapest items:', error);
      });
      request('GET', '/assiociatedItems')
      .then((response) => {
        this.setState({ assiociatedItems: response.data });
      })
      .catch((error) => {
        console.error('Error fetching cheapest items:', error);
      });
    }
    viewUser = () =>{
        this.props.updateComponentToShow("messages");    
    }
    viewItem = () =>{
        this.props.updateComponentToShow("user");    
    }
    render() {
        const { cheapestItems, assiociatedItems } = this.state;
    
        return (
            <div>
                <div style={{marginTop:'-47px',display: 'flex', justifyContent: 'center'}}>
                    <button className='btn btn-dark' onClick={this.viewUser} style={{ marginLeft: '10px' }}>
                        Users Management 
                    </button>
                    <button className='btn btn-dark' onClick={this.viewItem} style={{ marginLeft: '10px' }}>
                        Items Management 
                    </button>
                </div>
                
                <h2>List of Cheapest Items per Supplier</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            <th>Item Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cheapestItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2>List of suppliers associated to items whose price has been reduced</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {assiociatedItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    

}
export default CheapestItems;
