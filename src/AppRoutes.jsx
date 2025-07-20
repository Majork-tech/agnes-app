// AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import IndexPage from './components/IndexPage';
import Login from './pages/Login';
import ParentSignup from './pages/ParentSignup';
import FeaturesPage from './pages/FeaturesPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ParentDashboard from './pages/ParentDashboard';
import Homepage from './pages/Homepage';
import Logout from './pages/Logout';
import CreateQuizzes from './pages/CreateQuizzes';
import ViewSubmissions from './pages/ViewSubmissions';
import GradeResults from './pages/GradeResults';
import ViewResults from './pages/ViewResults';
import UploadVideos from './pages/UploadVideos';
import StudentUploads from './pages/StudentUploads';
import ViewUploads from './pages/ViewUploads';
import RegisterStudent from './pages/RegisterStudent';
import Invoices from './pages/Invoices';
import ViewResultsStudent from './pages/ViewResultsStudent';
import ViewQuizzesStudent from './pages/ViewQuizzesStudent';
import AttemptQuiz from './pages/AttemptQuiz';
import AttemptQuizFromSupabase from './pages/AttemptQuizFromSupabase';
import ViewChildResults from './pages/ViewChildResults';
import ViewInvoices from './pages/ViewInvoices';
import ViewVideos from './pages/ViewVideos';
import StudentUploadToAdmin from './pages/StudentUploadToAdmin';
import AdminUploads from './pages/AdminUploads';
import AdminDashboard2 from './pages/AdminDashboard2';
import StudentDashboard2 from './pages/StudentDashboard2';
import ParentDashboard2 from './pages/ParentDashboard2';
import AdminSignup from './pages/AdminSignup';
import ViewResultsStudent2, { MockTutorMarking, MockReport } from './pages/ViewResultsStudent2';
import AttemptQuizMock from './pages/AttemptQuizMock';
import ViewLearningMaterialMock from './pages/ViewLearningMaterialMock';
import TutorDirectMock from './pages/TutorDirectMock';
import ZoomClassMock from './pages/ZoomClassMock';
import TutorDirectParentMock from './pages/TutorDirectParentMock';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="parent-signup" element={<ParentSignup />} />
      <Route path="/" element={<App />}>
        {/* Public */}
        <Route index element={<IndexPage />} />
        <Route path="login" element={<Login />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="logout" element={<Logout />} />
        <Route path="features" element={<FeaturesPage />} />

        {/* Admin Routes */}
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="create-quizzes" element={<CreateQuizzes />} />
        <Route path="view-submissions" element={<ViewSubmissions />} />
        <Route path="grade-results" element={<GradeResults />} />
        <Route path="view-results" element={<ViewResults />} />
        <Route path="upload-videos" element={<UploadVideos />} />
        <Route path="student-uploads" element={<StudentUploads />} />
        <Route path="view-uploads" element={<ViewUploads />} />
        <Route path="register-student" element={<RegisterStudent />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="admin-uploads" element={<AdminUploads />} />
        <Route path="admindashboard2" element={<AdminDashboard2 />} />
        <Route path="admin-signup" element={<AdminSignup />} />

        {/* Student Routes */}
        <Route path="student-dashboard" element={<StudentDashboard />} />
        <Route path="view-results-student" element={<ViewResultsStudent />} />
        <Route path="view-results-student2" element={<ViewResultsStudent2 />} />
        <Route path="view-quizzes-student" element={<ViewQuizzesStudent />} />
        <Route path="attempt-quiz" element={<AttemptQuizFromSupabase />} />
        <Route path="attempt-quiz/:quizId" element={<AttemptQuiz />} />
        <Route path="student-dashboard2" element={<StudentDashboard2 />} />

        {/* Parent Routes */}
        <Route path="parent-dashboard" element={<ParentDashboard />} />
        <Route path="view-child-results" element={<ViewChildResults />} />
        <Route path="view-invoices" element={<ViewInvoices />} />
        <Route path="view-videos" element={<ViewVideos />} />
        <Route path="student-upload" element={<StudentUploadToAdmin />} />
        <Route path="parent-dashboard2" element={<ParentDashboard2 />} />
        <Route path="tutor-direct-parent-mock" element={<TutorDirectParentMock />} />

        {/* Mock Routes */}
        <Route path="mock/tutor-marking" element={<MockTutorMarking />} />
        <Route path="mock/report" element={<MockReport />} />

        {/* New Route */}
        <Route path="attempt-quiz-mock" element={<AttemptQuizMock />} />

        {/* New Route */}
        <Route path="view-learning-material-mock" element={<ViewLearningMaterialMock />} />

        {/* New Route */}
        <Route path="tutor-direct-mock" element={<TutorDirectMock />} />

        {/* New Route */}
        <Route path="zoom-class-mock" element={<ZoomClassMock />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
