import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/cats">The Pet Shelter</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/cats">Home</Nav.Link>
          <Nav.Link href="/cats">Edit New Cat</Nav.Link>
          <Nav.Link href="/cats">ADD New Cat</Nav.Link>
          <Nav.Link href="/cats">Message</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header_worker;