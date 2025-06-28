// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
  },
  endpoints: {
    quizzes: {
      getQuiz: (quizId) => `${API_BASE_URL}/quizzes/${quizId}`,
      submitQuiz: `${API_BASE_URL}/quizzes/submit`,
      getAllQuizzes: `${API_BASE_URL}/quizzes`,
      createQuiz: `${API_BASE_URL}/quizzes`,
      updateQuiz: (quizId) => `${API_BASE_URL}/quizzes/${quizId}`,
      deleteQuiz: (quizId) => `${API_BASE_URL}/quizzes/${quizId}`,
    },
    auth: {
      login: `${API_BASE_URL}/auth/login`,
      register: `${API_BASE_URL}/auth/register`,
      logout: `${API_BASE_URL}/auth/logout`,
    },
    users: {
      profile: `${API_BASE_URL}/users/profile`,
      updateProfile: `${API_BASE_URL}/users/profile`,
    },
    uploads: {
      uploadFile: `${API_BASE_URL}/uploads`,
      getFiles: `${API_BASE_URL}/uploads`,
    },
  },
};

export default apiConfig;
