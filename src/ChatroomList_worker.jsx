import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const ChatroomList_worker = ({ chatrooms, onChatroomSelect }) => {
  const [users, setUsers] = useState({});
  const [cats, setCats] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend.koto123.repl.co/api/all', {
          headers: {
            'auth-token': token,
          },
        });
        const usersData = response.data.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});
        setUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCats = async () => {
      try {
        const response = await axios.get('https://backend.koto123.repl.co/api/cats');
        const catsData = response.data.reduce((acc, cat) => {
          acc[cat._id] = cat;
          return acc;
        }, {});
        setCats(catsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    fetchCats();
  }, []);

  const handleChatroomSelect = (chatroomId) => {
    if (onChatroomSelect) {
      onChatroomSelect(chatroomId);
    }
  };

  const getUserName = (userId) => {
    const user = users[userId];
    return user ? user.name : 'Unknown User';
  };

  const getCatName = (catId) => {
    const cat = cats[catId];
    return cat ? cat.name : 'Unknown Cat';
  };

  return (
    <div>
      <h2>Chatrooms</h2>
      <ListGroup>
        {chatrooms.map((chatroom) => (
          <ListGroup.Item
            key={chatroom._id}
            action
            onClick={() => handleChatroomSelect(chatroom._id)}
          >
            User: {getUserName(chatroom.userId)} | Cat: {getCatName(chatroom.catId)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ChatroomList_worker;




