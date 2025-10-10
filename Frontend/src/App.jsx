import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Subject from './pages/Subject';
import { ThemeProvider } from './theme/Themeprovides';
import Dashboard from './pages/Dashboard';
import Addquestion from './components/Admin Control/Addquestion';
import UrlProvider from './context';
import Profile from './pages/Profile';
import RequireAuth from './components/Route Control/RequireAuth';
import Admin from './pages/Admin';
import RequireAdmin from './components/Route Control/RequireAdmin';
import Addsubject from './components/Admin Control/Addsubject';
import Addsubtopic from './components/Admin Control/Addsubtopic';
import Features from './components/Landing Page/Feature';
import UpdateQuestion from './components/Admin Control/UpdateQuestion';
import DeletQuestionPage from './components/Admin Control/DeleteQuestion';
import InterviewExperience from './pages/InterviewExperience';
import ViewInterviewExperience from './pages/ViewInterviewExperience';
import ScrollToTop from './ScrollToTop';
import ApproveInterviewExperiences from './pages/ApproveInterviewExperiences';
import ExperienceDetails from './components/Interview Experiences/ExperienceDetails';
import AboutUs from './pages/AboutUs';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Toaster } from 'sonner';

const LayoutWithScroll = () => (
  <>
    <ScrollToTop />
    <AppLayout />
  </>
);

const router = createBrowserRouter([
  {
    element: <LayoutWithScroll />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/auth/:mode', element: <Auth /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/features', element: <Features /> },
      { path: '/add-question', element: <Addquestion /> },
      {
        path: '/subject/:slug/:id',
        element: (
          <RequireAuth>
            <Subject />
          </RequireAuth>
        ),
      },
      { path: '/profile/:id', element: <Profile /> },
      {
        path: '/admin',
        element: (
          <RequireAdmin>
            <Admin />
          </RequireAdmin>
        ),
      },
      {
        path: '/admin/addQuestion',
        element: (
          <RequireAdmin>
            <Addquestion />
          </RequireAdmin>
        ),
      },
      {
        path: '/admin/addSubject',
        element: (
          <RequireAdmin>
            <Addsubject />
          </RequireAdmin>
        ),
      },
      {
        path: '/admin/addSubtopic',
        element: (
          <RequireAdmin>
            <Addsubtopic />
          </RequireAdmin>
        ),
      },
      {
        path: '/admin/updateQuestion',
        element: (
          <RequireAdmin>
            <UpdateQuestion />
          </RequireAdmin>
        ),
      },
      {
        path: '/admin/deleteQuestion',
        element: (
          <RequireAdmin>
            <DeletQuestionPage />
          </RequireAdmin>
        ),
      },
      {
        path: '/share-experience',
        element: (
          <RequireAuth>
            <InterviewExperience />
          </RequireAuth>
        ),
      },
      {
        path: '/view-interview-experiences',
        element: (
          <RequireAuth>
            <ViewInterviewExperience />
          </RequireAuth>
        ),
      },
      {
        path: '/view-interview-experiences/:experienceId',
        element: (
          <RequireAuth>
            <ExperienceDetails />
          </RequireAuth>
        ),
      },
      {
        path: '/admin/approveExperiences',
        element: (
          <RequireAdmin>
            <ApproveInterviewExperiences />
          </RequireAdmin>
        ),
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/cookies',
        element: <CookiePolicy />,
      },
      {
        path: '/terms',
        element: <TermsOfService />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <ThemeProvider>
        <RouterProvider router={router} />

        {/* ✅ Global Toaster (Sonner) */}
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </UrlProvider>
  );
}

export default App;
