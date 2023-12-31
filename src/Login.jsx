import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap';
import { FaEnvelope, FaLock} from 'react-icons/fa';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { getUserDetails } from './Checkuser';
import jwt_decode from 'jwt-decode';
import Header from './Header/header';


function Login() {
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
      console.log('Login successful!');
      if (role === 'charityWorker') {
        history.push('/worker');
      } else if (role === 'public'){
        history.push('/public');
      }else{
        history.push('/cats');
      }
    } catch (error) {
      console.log('Login unsuccessful!');
      setError(error.response.data);
    }
  };



  return (
    <div className="container">
      <Header />
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <FaEnvelope className="form-icon" />
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <FaLock className="form-icon" />
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







