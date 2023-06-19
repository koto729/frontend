import axios from 'axios';

export const getUserDetails = async (userId, token) => {
  try {
    const response = await axios.get(`https://backend.koto123.repl.co/api/me/${userId}`, {
      headers: {
        'auth-token': `${token}`, 
      },
    });

    const userDetails = response.data;
    return userDetails;
  } catch (error) {

    console.log('Error fetching user details:', error);
    throw error;
  }
};
