import axios from 'axios';

const API_KEY = '6ed825a94ff75e1bbe274ccee446d59cbc55b674074933b43cbb4ef205bd6efd';
const BASE_URL = 'https://api.json-generator.com/templates/ZM1r0eic3XEy/data';

export const fetchJobs = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}; 