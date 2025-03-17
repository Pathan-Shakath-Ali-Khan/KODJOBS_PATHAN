import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Header = styled.h1`
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  color: white;
  margin: 0;
  font-size: 2.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 1rem;
  }
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header>WELCOME TO KODJOBS</Header>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App; 