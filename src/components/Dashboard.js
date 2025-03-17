import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { fetchJobs } from '../services/api';

const DashboardContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  padding: 12px;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  flex: 1;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled(Button)`
  min-width: 120px;
`;

const LogoutButton = styled(Button)`
  background: linear-gradient(135deg, #e74c3c, #c0392b);

  &:hover {
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
  }
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0;
  }
`;

const JobCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #3498db, #2980b9);
  }
`;

const CompanyName = styled.h3`
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const JobTitle = styled.h4`
  color: var(--secondary-color);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const JobDetail = styled.p`
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: var(--secondary-color);
  }
`;

const Description = styled.p`
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: var(--secondary-color);

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--secondary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  padding: 20px;
  background: #fdeaea;
  border-radius: 10px;
  margin: 20px 0;
`;

const CompanyLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      navigate('/');
    }

    loadJobs();
  }, [navigate]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();
      setJobs(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filteredJobs = jobs.filter(job => 
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setJobs(filteredJobs);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingSpinner>Loading jobs...</LoadingSpinner>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <div>
          <h1>Welcome, {user?.name}</h1>
          <p>{jobs.length} jobs found</p>
        </div>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>

      <JobsGrid>
        {jobs.map((job) => (
          <JobCard key={job.id}>
            {job.logo && (
              <CompanyLogo src={job.logo} alt={job.company} />
            )}
            <CompanyName>{job.company}</CompanyName>
            <JobTitle>{job.position}</JobTitle>
            <JobDetail>
              <span>📍</span> {job.location}
            </JobDetail>
            <JobDetail>
              <span>💰</span> ${job.salary.toLocaleString()}
            </JobDetail>
            <JobDetail>
              <span>⏰</span> Posted: {new Date(job.postedAt).toLocaleDateString()}
            </JobDetail>
            <JobDetail>
              <span>👥</span> Experience: {job.experience}
            </JobDetail>
            <Description>
              {job.description.substring(0, 150)}...
            </Description>
            <TagsContainer>
              {job.requirements.map((req, index) => (
                <Tag key={index}>{req}</Tag>
              ))}
            </TagsContainer>
          </JobCard>
        ))}
      </JobsGrid>
    </DashboardContainer>
  );
}

export default Dashboard; 