import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Navbar from 'react-bootstrap/Navbar';
import Contact from './components/Contact';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { FaBeer, FaAngular, FaCloudversify} from 'react-icons/fa';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
  
      <Navbar bg="dark" variant="dark" className='name'>
        <Container >
          <Navbar.Brand href="#home">React</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home Anh */}
            {/* <FaCloudversify /></Nav.Link> */}
            {/* <Nav.Link href="/contact">Conact
            <FaAngular /></Nav.Link> */}
          </Nav>
          
          
        </Container>
      </Navbar>
 {/* <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title="Dropdown"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="/">Home</Dropdown.Item>
          <Dropdown.Item href="/contact">Contact</Dropdown.Item>
          
        </DropdownButton>
        
      </InputGroup> */}

      <div className='body'>
        <Home></Home>
        {/* <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/contact" element={<Contact/>} /> 
      </Routes>
    </BrowserRouter> */}
   
    </div>
    
   
      </header>
    

     
    </div>
  );
}

export default App;
