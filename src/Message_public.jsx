import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ChatroomList from './ChatroomList';
import MessageList from './MessageList';
import Header_public from './Header/header_user';

const Message_public = () => {
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken._id;

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const response = await axios.get(`https://backend.koto123.repl.co/api/chatrooms/user/${userId}`, {
          headers: {
            'auth-token': token,
          },
        });
        setChatrooms(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatrooms();
  }, [userId]);

  const handleChatroomSelect = (chatroomId) => {
    setSelectedChatroom(chatroomId);
    console.log(chatroomId);
  };

  return (
    <div>
      <Header_public/>
      <Container fluid>
        <Row>
          <Col sm={4}>
            <ChatroomList chatrooms={chatrooms} onChatroomSelect={handleChatroomSelect} />
          </Col>
          <Col sm={8}>
            {selectedChatroom ? (
              <MessageList chatroomId={selectedChatroom} />
            ) : (
              <Alert variant="info">Please select a chatroom</Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Message_public;







