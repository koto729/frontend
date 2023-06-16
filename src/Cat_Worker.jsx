import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header_worker from './Header/header_worker';

function Cat() {
  const [cats, setCats] = useState([]);
  const [breedFilter, setBreedFilter] = useState('');
  const [centerFilter, setCenterFilter] = useState('');

  useEffect(() => {
    const fetchCats = async () => {
      try {
        let url = 'https://backend.koto123.repl.co/api/cats';

        // Add breed filter if provided
        if (breedFilter) {
          url += `/breed/${breedFilter}`;
        }

        // Add center filter if provided
        if (centerFilter) {
          url += `/center/${centerFilter}`;
        }

        const response = await axios.get(url);
        setCats(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCats();
  }, [breedFilter, centerFilter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleBreedChange = (event) => {
    setBreedFilter(event.target.value);
  };

  const handleCenterChange = (event) => {
    setCenterFilter(event.target.value);
  };

  
  return (
    <Container>
      <Header_worker/>
      <h2>Animals for Adoption</h2>
      <Form>
      <Row>
        <Col>
          <Form.Group controlId="breedFilter">
            <Form.Label>Breed:</Form.Label>
            <Form.Control type="text" value={breedFilter} onChange={handleBreedChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="centerFilter">
            <Form.Label>Center:</Form.Label>
            <Form.Control as="select" value={centerFilter} onChange={handleCenterChange}>
              <option value="">All Centers</option>
              <option value="Kowloon Centre">Kowloon Center</option>
              <option value="Sha Tin Center">Sha Tin Center</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      </Form>
      <br/>
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
                <Link to={`/edit/${cat._id}`} className="btn btn-primary">View Details</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cat;