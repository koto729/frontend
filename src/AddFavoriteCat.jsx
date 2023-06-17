import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import jwt_decode from 'jwt-decode';

function AddFavoriteCat() {
  const { id } = useParams();
  const history = useHistory();
  const [cat, setCat] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const decodedToken = jwt_decode(localStorage.getItem('token'));

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get(`https://backend.koto123.repl.co/api/cats/${id}`);
        setCat(response.data);
        console.log(response.data);

        // Check if the cat is favorited by the user
        const favoritedResponse = await axios.get(`https://backend.koto123.repl.co/api/favorite/${decodedToken._id}/${id}`);
        console.log(favoritedResponse.data);
        if (favoritedResponse.data.length > 0) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.log(error);
      }
      
    };

    fetchCat();
  }, [id]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        // del favorite
        await axios.delete(`https://backend.koto123.repl.co/api/favorite/${decodedToken._id}/${id}`);
        setIsFavorite(false);
        console.log('Cat removed from favorites');
      } else {
        // Add favorite
        await axios.post(`https://backend.koto123.repl.co/api/favorite`, { userId: decodedToken._id, catId: id });
        setIsFavorite(true);
        console.log('Cat added to favorites');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleBack = () => {
    history.goBack(); 
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
          <h3>Favorite:
          <Button variant="link" onClick={handleFavorite} >
            {isFavorite ? (
              <FaHeart color="red" size={30} />
            ) : (
              <FaHeart color="gray" size={30} />
            )}
          </Button>
          </h3>
          <br/>
          <Button variant="primary" onClick={handleBack}>           
            Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddFavoriteCat;


  