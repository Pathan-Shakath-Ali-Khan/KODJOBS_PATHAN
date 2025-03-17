import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  background: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background-image: url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(44, 62, 80, 0.8),
      rgba(52, 152, 219, 0.8)
    );
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const FormsSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: var(--white);
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--white);
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: var(--light-gray);

  &:focus {
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, var(--secondary-color), #2980b9);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #2980b9, var(--secondary-color));
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  }
`;

const FormTitle = styled.h2`
  color: var(--text-color);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 10px;
  text-align: center;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 50px;
    height: 4px;
    background: var(--secondary-color);
    border-radius: 2px;
    transform: translateX(-50%);
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: var(--accent-color);
  padding: 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  border-left: 4px solid var(--accent-color);
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background: #e8f5e9;
  color: #2ecc71;
  padding: 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  border-left: 4px solid #2ecc71;
  margin-bottom: 1rem;
`;

const WelcomeText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: white;
  width: 80%;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    dob: '',
    email: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      u => u.name === loginData.username && u.pwd === loginData.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (!signupData.username || !signupData.password || !signupData.dob || !signupData.email) {
      setError('All fields are required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(user => user.name === signupData.username || user.email === signupData.email)) {
      setError('Username or email already exists');
      return;
    }

    const today = new Date();
    const birthDate = new Date(signupData.dob);
    const age = today.getFullYear() - birthDate.getFullYear();

    const newUser = {
      id: Date.now(),
      name: signupData.username,
      pwd: signupData.password,
      email: signupData.email,
      DOB: signupData.dob,
      age: age
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    
    setSignupData({
      username: '',
      password: '',
      dob: '',
      email: ''
    });
    
    setError('');
    setSuccess('Registration successful! Please login.');
  };

  return (
    <PageContainer>
      <ImageSection>
        <WelcomeText>
          <h1>Welcome to KodJobs</h1>
          <p>Find your dream job and take the next step in your career</p>
        </WelcomeText>
      </ImageSection>

      <FormsSection>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <div>
          <FormTitle>Login</FormTitle>
          <Form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Enter Username"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            />
            <Input
              type="password"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
            <Button type="submit">Login</Button>
          </Form>
        </div>

        <div>
          <FormTitle>Sign Up</FormTitle>
          <Form onSubmit={handleSignup}>
            <Input
              type="text"
              placeholder="Enter Username"
              value={signupData.username}
              onChange={(e) => setSignupData({...signupData, username: e.target.value})}
            />
            <Input
              type="password"
              placeholder="Enter Password"
              value={signupData.password}
              onChange={(e) => setSignupData({...signupData, password: e.target.value})}
            />
            <Input
              type="date"
              placeholder="Enter Date of Birth"
              value={signupData.dob}
              onChange={(e) => setSignupData({...signupData, dob: e.target.value})}
            />
            <Input
              type="email"
              placeholder="Enter Email"
              value={signupData.email}
              onChange={(e) => setSignupData({...signupData, email: e.target.value})}
            />
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
      </FormsSection>
    </PageContainer>
  );
}

export default LoginPage; 