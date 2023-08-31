import logo from '../logo.svg';
import './App.css';
import Header from './Header';
import AppContent from './AppContent';

function App() {
  return (
    <div>
        <Header pageTitle="Items Management"  logoSrc={logo}></Header>
        <div className='container-fluid'>
          <div className='row'> 
            <div className='col'>
            <AppContent></AppContent>
            </div>
          </div>
        
        </div>
        
    </div>
  );
}

export default App;
