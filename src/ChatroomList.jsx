import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ListGroup } from 'react-bootstrap';

const ChatroomList = ({ onChatroomSelect }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [catNames, setCatNames] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken._id;

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
    }
  }, [token]);

  useEffect(() => {
    const fetchCatNames = async () => {
      try {
        const catIds = chatrooms.map((chatroom) => chatroom.catId);
        const catNamePromises = catIds.map((catId) => fetchCatName(catId));
        const catNameResponses = await Promise.all(catNamePromises);
        const catNamesMap = catNameResponses.reduce((map, response, index) => {
          map[catIds[index]] = response;
          return map;
        }, {});
        setCatNames(catNamesMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCatNames();
  }, [chatrooms]);

  const fetchCatName = async (catId) => {
    try {
      const response = await axios.get(`https://backend.koto123.repl.co/api/cats/${catId}`);
      return response.data.name;
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  return (
    <div>
      <h2>Chatrooms</h2>
      <ListGroup>
        {chatrooms.map((chatroom) => (
          <ListGroup.Item key={chatroom._id} action onClick={() => onChatroomSelect(chatroom._id)}>
            {catNames[chatroom.catId]}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ChatroomList;

