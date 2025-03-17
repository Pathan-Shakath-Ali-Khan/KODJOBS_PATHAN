export const validateUser = (userData) => {
  const errors = [];

  if (!userData.username || userData.username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (!userData.password || userData.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!userData.email || !userData.email.includes('@')) {
    errors.push('Please enter a valid email address');
  }

  if (!userData.dob) {
    errors.push('Date of birth is required');
  }

  const dobDate = new Date(userData.dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  
  if (age < 18) {
    errors.push('You must be at least 18 years old to register');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 