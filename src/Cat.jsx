import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Card, Col, Container, Row } from 'react-bootstrap';
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

  return (
    <Container>
      <h2>Cats</h2>
      <Row>
        {cats.map((cat) => (
          <Col key={cat._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={cat.image} />
              <Card.Body>
                <Card.Title>{cat.name}</Card.Title>
                <Link to={`/cat/${cat._id}`} className="btn btn-primary">View Details</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cat;


