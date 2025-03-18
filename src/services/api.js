import axios from 'axios';

const API_KEY = '0379e8354b1a20d99bce11325c6e1911db3f33f71ba6331540a20c34c9287d58';
const BASE_URL = 'https://api.json-generator.com/templates/ZM1r0eic3XEy/data';

export const fetchJobs = async () => {
  try {
    console.log('Attempting to fetch jobs from:', BASE_URL);
    
    const response = await axios({
      method: 'get',
      url: BASE_URL,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    // Log successful response
    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', response.headers);
    
    if (!response.data) {
      throw new Error('No data received from API');
    }

    return response.data;

  } catch (error) {
    // Enhanced error logging
    console.error('API Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });

    // Provide fallback data if API fails
    return getMockJobs();
  }
};

// Mock data function
const getMockJobs = () => {
  return [
    {
      id: 1,
      company: "Tech Corp",
      logo: "https://via.placeholder.com/100",
      position: "Senior Frontend Developer",
      location: "New York, NY",
      salary: 120000,
      postedAt: new Date().toISOString(),
      description: "We are looking for an experienced Frontend Developer to join our team.",
      requirements: ["React", "TypeScript", "5+ years experience"]
    },
    {
      id: 2,
      company: "Digital Solutions",
      logo: "https://via.placeholder.com/100",
      position: "Full Stack Engineer",
      location: "Remote",
      salary: 135000,
      postedAt: new Date().toISOString(),
      description: "Join our remote team as a Full Stack Engineer.",
      requirements: ["Node.js", "React", "MongoDB"]
    },
    {
      id: 3,
      company: "Cloud Systems",
      logo: "https://via.placeholder.com/100",
      position: "DevOps Engineer",
      location: "Austin, TX",
      salary: 110000,
      postedAt: "2024-01-20T11:00:00Z",
      description: "Looking for a skilled DevOps engineer to improve our infrastructure...",
      requirements: ["AWS", "Docker", "Kubernetes"],
      experience: "Senior Level"
    },
    {
      id: 4,
      company: "Data Analytics Co",
      logo: "https://via.placeholder.com/100",
      position: "Data Scientist",
      location: "Boston, MA",
      salary: 115000,
      postedAt: "2024-01-19T15:00:00Z",
      description: "Join our data science team to work on machine learning projects...",
      requirements: ["Python", "ML", "Statistics"],
      experience: "Mid Level"
    },
    {
      id: 5,
      company: "Mobile Apps Inc",
      logo: "https://via.placeholder.com/100",
      position: "Mobile Developer",
      location: "Seattle, WA",
      salary: 100000,
      postedAt: "2024-01-18T14:00:00Z",
      description: "Seeking a talented mobile developer for our growing team...",
      requirements: ["React Native", "iOS", "Android"],
      experience: "Mid Level"
    }
  ];
}; 