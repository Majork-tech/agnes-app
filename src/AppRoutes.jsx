import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CreateQuizzes from './pages/CreateQuizzes';
import ViewSubmissions from './pages/ViewSubmissions';
import GradeResults from './pages/GradeResults';
import ViewResults from './pages/ViewResults';
import UploadVideos from './pages/UploadVideos';
import StudentUploads from './pages/StudentUploads';
import ViewUploads from './pages/ViewUploads';
import RegisterStudent from './pages/RegisterStudent';
import Invoices from './pages/Invoices';
import Logout from './pages/Logout';
import ViewVideos from './pages/ViewVideos';
import StudentUploadToAdmin from './pages/StudentUploadToAdmin';
import AdminUploads from './pages/AdminUploads';
import ViewResultsStudent from './pages/ViewResultsStudent';
import ViewQuizzesStudent from './pages/ViewQuizzesStudent';
import AttemptQuiz from './pages/AttemptQuiz';
import ParentDashboard from './pages/ParentDashboard';
import ViewChildResults from './pages/ViewChildResults';
import ViewInvoices from './pages/ViewInvoices';
import IndexPage from './components/IndexPage'; // Import the new IndexPage

export default function AppRoutes() {
  return (
    <Routes>
      {/* Index Page */}
      <Route path="/" element={<IndexPage />} />

      {/* Common Routes */}
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/logout" element={<Logout />} />

      {/* Admin Routes */}
      <Route path="/create-quizzes" element={<CreateQuizzes />} />
      <Route path="/take-quiz" element={<AttemptQuiz />} />
      <Route path="/view-submissions" element={<ViewSubmissions />} />
      <Route path="/grade-results" element={<GradeResults />} />
      <Route path="/view-results" element={<ViewResults />} />
      <Route path="/upload-videos" element={<UploadVideos />} />
      <Route path="/student-uploads" element={<StudentUploads />} />
      <Route path="/view-uploads" element={<ViewUploads />} />
      <Route path="/register-student" element={<RegisterStudent />} />
      <Route path="/invoices" element={<Invoices />} />

      {/* Student Routes */}
      <Route path="/view-quizzes" element={<ViewQuizzesStudent />} />
      <Route path="/view-videos" element={<ViewVideos />} />
      <Route path="/student-upload" element={<StudentUploadToAdmin />} />
      <Route path="/admin-uploads" element={<AdminUploads />} />
      <Route path="/view-results-student" element={<ViewResultsStudent />} />
      <Route path="/attempt-quiz" element={<AttemptQuiz />} />

      {/* Parent Routes */}
      <Route path="/parent-dashboard" element={<ParentDashboard />} />
      <Route path="/view-child-results" element={<ViewChildResults />} />
      <Route path="/view-invoices" element={<ViewInvoices />} />
    </Routes>
  );
}