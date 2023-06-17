import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Header_public from './Header/header_user';

function FavoriteList() {
  const decodedToken = jwt_decode(localStorage.getItem('token'));
  const userId = decodedToken._id;
  const [favoriteCats, setFavoriteCats] = useState([]);

  useEffect(() => {
    const fetchFavoriteCats = async () => {
      try {
        const response = await axios.get(`https://backend.koto123.repl.co/api/favorite/user/${userId}`);
        const favoriteCatIds = response.data.map((favoriteCat) => favoriteCat.catId);
        const catDetailsPromises = favoriteCatIds.map((catId) => axios.get(`https://backend.koto123.repl.co/api/cats/${catId}`));
        const catDetailsResponses = await Promise.all(catDetailsPromises);
        const favoriteCatsData = catDetailsResponses.map((response) => response.data);
        setFavoriteCats(favoriteCatsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteCats();
  }, [decodedToken._id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Container>
      <Header_public />
      <h2>Favorite Cats List</h2>
      <Row>
        {favoriteCats.length === 0 ? (
          <p>No favorite cats found.</p>
        ) : (
          favoriteCats.map((cat) => (
            <Col key={cat._id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={cat.image} />
                <Card.Body>
                  <Card.Text>Name: {cat.name}</Card.Text>
                  <Card.Text>Breed: {cat.breed}</Card.Text>
                  <Card.Text>Birthday: {formatDate(cat.birthday)}</Card.Text>
                  <Card.Text>Center: {cat.center}</Card.Text>
                  <Link to={`/cat_user/${cat._id}`} className="btn btn-primary">View Details</Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default FavoriteList;
