import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function AddCat() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('male');
  const [microchipNo, setMicrochipNo] = useState('');
  const [birthday, setBirthday] = useState('');
  const [center, setCenter] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [error, setError] = useState('');

  const handleAddCat = (e) => {
    e.preventDefault();

    const catData = {
      name,
      image: image.name,
      breed,
      gender,
      microchipNo,
      birthday,
      center,
      introduction
    };

    fetch('https://backend.koto123.repl.co/api/addcat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(catData)
    })
      .then((response) => {
        if (response.ok) {
          console.log('Cat added successfully');
          // Clear the form fields
          setName('');
          setImage(null);
          setBreed('');
          setGender('male');
          setMicrochipNo('');
          setBirthday('');
          setCenter('');
          setIntroduction('');
          setError('');
          // Redirect to the cat list page or show a success message
        } else {
          throw new Error('Failed to add cat');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <h2>Add New Cat</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleAddCat}>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </Form.Group>
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
          <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formCenter">
          <Form.Label>Center:</Form.Label>
          <Form.Control type="text" value={center} onChange={(e) => setCenter(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formIntroduction">
          <Form.Label>Introduction:</Form.Label>
          <Form.Control as="textarea" rows={3} value={introduction} onChange={(e) => setIntroduction(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Cat
        </Button>
      </Form>
    </div>
  );
}

export default AddCat;


