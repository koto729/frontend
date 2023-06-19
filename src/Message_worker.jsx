import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ChatroomList_worker from './ChatroomList_worker';
import MessageList_worker from './MessageList_worker';
import Header_worker from './Header/header_worker';

const Message_worker = () => {
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken._id;

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const response = await axios.get('https://backend.koto123.repl.co/api/chatrooms', {
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
  };

  return (
    <div>
      <Header_worker />
      <Container fluid>
        <Row>
          <Col sm={4}>
            <ChatroomList_worker chatrooms={chatrooms} onChatroomSelect={handleChatroomSelect} />
          </Col>
          <Col sm={8}>
            {selectedChatroom ? (
              <MessageList_worker chatroomId={selectedChatroom} />
            ) : (
              <Alert variant="info">Please select a chatroom</Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Message_worker;
