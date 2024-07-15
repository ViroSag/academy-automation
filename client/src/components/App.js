import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import AppBody from "./AppBody";
import MainPage from "./MainPage";
import StudentsList from "./StudentsList";
import AddStudent from "./AddStudent";
import TeachersList from "./TeachersList";
import AddTeacher from "./AddTeacher";
import SessionsList from "./SessionsList";
import AddSession from "./AddSession";
import CurrentSessionAsStudent from "./CurrentSessionAsStudent";
import CurrentSessionAsTutor from "./CurrentSessionAsTutor";
import QuestionsList from "./QuestionsList";
import AdminPanel from "./AdminPanel/AdminPanel";
import QRScanner from "./QRScanner";
import TimeTable from "./TimeTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppBody />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "students",
        element: <StudentsList />,
      },
      {
        path: "addstudents",
        element: <AddStudent />,
      },
      {
        path: "teachers",
        element: <TeachersList />,
      },
      {
        path: "addteachers",
        element: <AddTeacher />,
      },
      {
        path: "addsession",
        element: <AddSession />,
      },
      {
        path: "sessions",
        element: <SessionsList />,
      },
      {
        path: "sessions/as-tutor/:sessionId",
        element: <CurrentSessionAsTutor />,
      },
      {
        path: "sessions/as-student/:sessionId",
        element: <CurrentSessionAsStudent />,
      },
      {
        path: "questions",
        element: <QuestionsList />,
      },
      {
        path: "adminpanel",
        element: <AdminPanel />,
      },
      {
        path: "qrscanner/:sessionId",
        element: <QRScanner />,
      },
      {
        path: "timetable",
        element: <TimeTable />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
