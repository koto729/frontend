import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function CatDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get(`https://backend.koto123.repl.co/api/cats/${id}`);
        setCat(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCat();
  }, [id]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleBack = () => {
    history.goBack(); // Go back to the previous page
  }; 
  
  if (!cat) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Cat Details</h2>
      <Card>
        <Card.Img variant="top" src={cat.image} />
        <Card.Body>
          <Card.Title>{cat.name}</Card.Title>
          <Card.Text>Breed: {cat.breed}</Card.Text>
          <Card.Text>Gender: {cat.gender}</Card.Text>
          <Card.Text>MicrochipNo: {cat.microchipNo}</Card.Text>
          <Card.Text>Birthday: {formatDate(cat.birthday)}</Card.Text>
          <Card.Text>Center: {cat.center}</Card.Text>
          <Card.Title>Introduction:</Card.Title>
          <Card.Text>{cat.introduction}</Card.Text>
          <Button variant="primary" onClick={handleBack}>Back</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CatDetail;
