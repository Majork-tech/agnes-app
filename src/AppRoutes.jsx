import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CreateQuizzes from './pages/CreateQuizzes';
import ViewSubmissions from './pages/ViewSubmissions';
// Import other page components
import GradeResults from './pages/GradeResults';
import ViewResults from './pages/ViewResults';
import UploadVideos from './pages/UploadVideos';
import StudentUploads from './pages/StudentUploads';
import ViewUploads from './pages/ViewUploads';
import RegisterStudent from './pages/RegisterStudent';
import Invoices from './pages/Invoices';
import Logout from './pages/Logout';
import TakeQuiz from './pages/TakeQuiz';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/create-quizzes" element={<CreateQuizzes />} />
      <Route path="/take-quiz/" element={<TakeQuiz />} />
      <Route path="/view-submissions" element={<ViewSubmissions />} />
      <Route path="/grade-results" element={<GradeResults />} />
      <Route path="/view-results" element={<ViewResults />} />
      <Route path="/upload-videos" element={<UploadVideos />} />
      <Route path="/student-uploads" element={<StudentUploads />} />
      <Route path="/view-uploads" element={<ViewUploads />} />
      <Route path="/register-student" element={<RegisterStudent />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}