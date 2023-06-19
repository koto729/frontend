import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';


function Header_worker() {
  const history = useHistory();

  const handleLogout = () => {
    // Clear the localStorage and redirect to the login page
    localStorage.clear();
    //window.location.reload();
    history.push('/');
  };
  
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/worker">The Pet Shelter</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/worker">Home</Nav.Link>
          <Nav.Link as={Link} to="/addcat">ADD New Cat</Nav.Link>
          <Nav.Link as={Link} to="/message_worker">Message</Nav.Link>
        </Nav>
        <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header_worker;