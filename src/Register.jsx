import React, { useState } from 'react';
import { Container, Form, Button, Alert  } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaCode} from 'react-icons/fa';
import axios from 'axios';
import Header from './Header/header';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'public',
    centerLocation: '',
    signUpCode: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(userData);
      await axios.post('https://backend.koto123.repl.co/api/register', userData);
      setRegistrationSuccess(true);
      console.log('Registration successful');
      setUserData({
        name: '',
        email: '',
        password: '',
        role: 'public',
        centerLocation: '',
        signUpCode: ''
      });
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <Container>
      <Header/>
      <h2>Register</h2>
      
      {registrationSuccess && (
        <Alert variant="success" onClose={() => setRegistrationSuccess(false)} dismissible>
          Registration successful!
        </Alert>
      )}
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="name">
          <FaUser className="form-icon" />
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <FaEnvelope className="form-icon" />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <FaLock className="form-icon" />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            required
          >
            <option value="public">Public</option>
            <option value="charityWorker">Charity Worker</option>
          </Form.Control>
        </Form.Group>

        {userData.role === 'charityWorker' && (
          <>
            <Form.Group controlId="centerLocation">
              <FaMapMarkerAlt className="form-icon" />
              <Form.Label>Center Location</Form.Label>
              <Form.Control
                as="select"
                name="centerLocation"
                value={userData.centerLocation}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Kowloon Centre">Kowloon Centre</option>
                <option value="Sha Tin Center">Sha Tin Center</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="signUpCode">
              <FaCode className="form-icon" />
              <Form.Label>Sign-Up Code</Form.Label>
              <Form.Control
                type="text"
                name="signUpCode"
                value={userData.signUpCode}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </>
        )}

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
