import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

function Header_user() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    //window.location.reload();
    history.push('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/public">
        The Pet Shelter
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/public">Home</Nav.Link>
          <Nav.Link as={Link} to="/favoritelist">Favourites</Nav.Link>
          <Nav.Link as={Link} to="/message">Message</Nav.Link>
        </Nav>
        <Button variant="outline-primary" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header_user;
