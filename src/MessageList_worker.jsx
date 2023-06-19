import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Card, Form, Button } from 'react-bootstrap';

const MessageList_worker = ({ chatroomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken._id;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://backend.koto123.repl.co/api/messages/${chatroomId}`, {
          headers: {
            'auth-token': token,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [chatroomId]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://backend.koto123.repl.co/api/messages',
        {
          chatroomId,
          userId,
          message: newMessage,
        },
        {
          headers: {
            'auth-token': token,
          },
        }
      );

      // Update the messages state with the new message
      setMessages([...messages, response.data]);

      // Clear the input field
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`https://backend.koto123.repl.co/api/messages/${messageId}`, {
        headers: {
          'auth-token': token,
        },
      });

      // Remove the deleted message from the messages state
      setMessages(messages.filter((message) => message._id !== messageId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <Card>
        <Card.Body>
          <ul>
            {messages.map((message) => (
              <li key={message._id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    {message.userId === userId ? 'Me' : 'User'}: {message.message}
                  </span>
                  <Button variant="danger" onClick={() => handleDeleteMessage(message._id)}>
                    X
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Form onSubmit={handleMessageSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter your message"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MessageList_worker;




