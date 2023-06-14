import axios from 'axios';

export const getUserDetails = async (userId, token) => {
  try {
    const response = await axios.get(`https://backend.koto123.repl.co/api/me/${userId}`, {
      headers: {
        'auth-token': `${token}`, // Include the token in the request headers
      },
    });

    const userDetails = response.data;
    return userDetails;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.log('Error fetching user details:', error);
    throw error;
  }
};
