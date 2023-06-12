import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backend.koto123.repl.co/api/login', { email, password });
      const token = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Set isLoggedIn to true
      setIsLoggedIn(true);
      console.log('Login successful!');
    } catch (error) {
      setError(error.response.data);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/cats" />;
  }

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  );
}

export default Login;





