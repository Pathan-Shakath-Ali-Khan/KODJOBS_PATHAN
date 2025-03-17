import axios from 'axios';

export const usersService = {
  async getAllUsers() {
    try {
      // In a real application, this would be an API call
      const usersData = localStorage.getItem('usersData');
      return usersData ? JSON.parse(usersData).users : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  async saveUser(userData) {
    try {
      const existingUsers = await this.getAllUsers();
      const updatedUsers = {
        users: [...existingUsers, userData]
      };
      localStorage.setItem('usersData', JSON.stringify(updatedUsers));
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },

  async findUserByCredentials(username, password) {
    try {
      const users = await this.getAllUsers();
      return users.find(user => user.name === username && user.pwd === password);
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  }
}; 