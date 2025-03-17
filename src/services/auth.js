import axios from 'axios';

export const authService = {
  async login(username, password) {
    try {
      const response = await axios.get('/users.json');
      const users = response.data;
      return users.find(user => user.name === username && user.pwd === password);
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  },

  isAuthenticated() {
    return localStorage.getItem('user') !== null;
  },

  logout() {
    localStorage.removeItem('user');
  }
}; 