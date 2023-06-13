import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

function Header_user() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    history.push('/login');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/cats">
        The Pet Shelter
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/cats">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/cats">
            Favourites
          </Nav.Link>
          <Nav.Link as={Link} to="/cats">
            Message
          </Nav.Link>
        </Nav>
        <Button variant="outline-primary" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header_user;
