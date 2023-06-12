import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Header from './Header/header';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Cat() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get('https://backend.koto123.repl.co/api/cats');
        setCats(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCats();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  
  return (
    <Container>
    <Header />
      <h2>Animals for Adoption</h2>
      <Row>
        {cats.map((cat) => (
          <Col key={cat._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={cat.image} />
              <Card.Body>
                <Card.Text>Name: {cat.name}</Card.Text>
                <Card.Text>Breed: {cat.breed}</Card.Text>
                <Card.Text>Birthday: {formatDate(cat.birthday)}</Card.Text>
                <Card.Text>center: {cat.center}</Card.Text>
                <Link to={`/cats/${cat._id}`} className="btn btn-primary">View Details</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cat;


