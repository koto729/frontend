import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { getUserDetails } from './Checkuser';
import jwt_decode from 'jwt-decode';

function Login( {setIsLoggedIn, setRole, isLoggedIn} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backend.koto123.repl.co/api/login', { email, password });
      console.log('Response:', response);
      const token = response.data;

      // Store the token and role in local storage
      localStorage.setItem('token', token);

    // Get the user details using the userId
      const decodedToken = jwt_decode(token);
      console.log(token);
      console.log(decodedToken._id);
      const userDetails = await getUserDetails(decodedToken._id, token);
      const role = userDetails.role;
      console.log('Role:', role);
      
      // Set isLoggedIn and role
      setIsLoggedIn(true);
      setRole(role);
      console.log('Login successful!');
      history.push('/cats');
    } catch (error) {
      console.log('Login unsuccessful!');
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;







