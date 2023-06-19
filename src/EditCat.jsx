import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function CatDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [cat, setCat] = useState(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [microchipNo, setMicrochipNo] = useState('');
  const [birthday, setBirthday] = useState('');
  const [center, setCenter] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get(`https://backend.koto123.repl.co/api/cats/${id}`);
        setCat(response.data);
        setName(response.data.name);
        setImage(response.data.image);
        setBreed(response.data.breed);
        setGender(response.data.gender);
        setMicrochipNo(response.data.microchipNo);
        setBirthday(response.data.birthday);
        setCenter(response.data.center);
        setIntroduction(response.data.introduction);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCat();
  }, [id]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};



  const handleBack = () => {
    history.goBack(); 
  };

  const handleUpdateCat = async (e) => {
    e.preventDefault();

    try {
      const updatedCat = {
        name,
        image,
        breed,
        gender,
        microchipNo,
        birthday,
        center,
        introduction
      };

      const response = await axios.put(`https://backend.koto123.repl.co/api/cats/${id}`, updatedCat, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
  
      if (response.status === 200) {
        setCat(response.data);
        setError('');
        console.log('Cat updated successfully');
        history.goBack();
      } else {
        throw new Error('Failed to update cat');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCat = async () => {
    try {
      const response = await axios.delete(`https://backend.koto123.repl.co/api/cats/${id}`, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });

      if (response.status === 200) {
        console.log('Cat deleted successfully');
        history.goBack();
      } else {
        throw new Error('Failed to delete cat');
      }
    } catch (error) {
      console.error(error);
    }
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
          <Form onSubmit={handleUpdateCat}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image:</Form.Label>
              <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
            </Form.Group>
            <small>e.g.:https://drive.google.com/uc?export=view&id=1zmxP3f0IzNcOa15rnDM7H7zpP8R98lql</small>
            <Form.Group controlId="formBreed">
              <Form.Label>Breed:</Form.Label>
              <Form.Control type="text" value={breed} onChange={(e) => setBreed(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMicrochipNo">
              <Form.Label>Microchip Number:</Form.Label>
              <Form.Control type="text" value={microchipNo} onChange={(e) => setMicrochipNo(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" value={formatDate(birthday)} onChange={(e) => setBirthday(e.target.value)} required />
            </Form.Group>
            
            <Form.Group controlId="formCenter">
              <Form.Label>Center:</Form.Label>
              <Form.Control as="select" value={center} onChange={(e) => setCenter(e.target.value)} required>
                <option value="Kowloon Centre">Kowloon Centre</option>
                <option value="Sha Tin Center">Sha Tin Center</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formIntroduction">
              <Form.Label>Introduction:</Form.Label>
              <Form.Control as="textarea" rows={3} value={introduction} onChange={(e) => setIntroduction(e.target.value)} required />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Update Cat
            </Button>
            <Button variant="danger" onClick={handleDeleteCat}>
              Delete Cat
            </Button> 
          </Form>
          <br />
          <Button variant="primary" onClick={handleBack}>Back</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CatDetail;
