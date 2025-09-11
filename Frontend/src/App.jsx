import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Subject from "./pages/Subject";
import { ThemeProvider } from "./theme/Themeprovides";
import Dashboard from "./pages/Dashboard";
import Addquestion from "./components/Admin Control/Addquestion";
import UrlProvider from "./context";
import Profile from "./pages/Profile";
import RequireAuth from "./components/Route Control/RequireAuth";
import Admin from "./pages/Admin";
import RequireAdmin from "./components/Route Control/RequireAdmin";
import Addsubject from "./components/Admin Control/Addsubject";
import Addsubtopic from "./components/Admin Control/Addsubtopic";
import Features from "./components/Landing Page/Feature";
import UpdateQuestion from "./components/Admin Control/UpdateQuestion";
import DeletQuestionPage from "./components/Admin Control/DeleteQuestion";
import InterviewExperience from "./pages/InterviewExperience";
import ViewInterviewExperience from "./pages/ViewInterviewExperience";
import ScrollToTop from "./ScrollToTop";
import ApproveInterviewExperiences from "./pages/ApproveInterviewExperiences";
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
      { path: "/", element: <Landing /> },
      { path: "/auth/:mode", element: <Auth /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/features", element: <Features /> },
      { path: "/add-question", element: <Addquestion /> },
      {
        path: "/subject/:slug/:id",
        element: (
          <RequireAuth>
            <Subject />
          </RequireAuth>
        ),
      },
      { path: "/profile", element: <Profile /> },
      {
        path: "/admin",
        element: (
          <RequireAdmin>
            <Admin />
          </RequireAdmin>
        ),
      },
      {
        path: "/admin/addQuestion",
        element: (
          <RequireAdmin>
            <Addquestion />
          </RequireAdmin>
        ),
      },
      {
        path: "/admin/addSubject",
        element: (
          <RequireAdmin>
            <Addsubject />
          </RequireAdmin>
        ),
      },
      {
        path: "/admin/addSubtopic",
        element: (
          <RequireAdmin>
            <Addsubtopic />
          </RequireAdmin>
        ),
      },
      {
        path: "/admin/updateQuestion",
        element: (
          <RequireAdmin>
            <UpdateQuestion />
          </RequireAdmin>
        ),
      },
      {
        path: "/admin/deleteQuestion",
        element: (
          <RequireAdmin>
            <DeletQuestionPage />
          </RequireAdmin>
        ),
      },
      {
        path: "/share-experience",
        element: (
          <RequireAuth>
            <InterviewExperience />
          </RequireAuth>
        ),
      },
      {
        path: "/view-interview-experiences",
        element: (
          <RequireAuth>
            <ViewInterviewExperience />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/approveExperiences",
        element: (
          <RequireAdmin>
            <ApproveInterviewExperiences/>
          </RequireAdmin>
        ),
      }
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UrlProvider>
  );
}

export default App;
