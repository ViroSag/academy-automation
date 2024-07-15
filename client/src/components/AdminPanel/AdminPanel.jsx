import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./Sidebar";
import StudentsList from "../StudentsList";
import AddStudent from "../AddStudent";
import TeachersList from "../TeachersList";
import AddTeacher from "../AddTeacher";
import SessionsList from "../SessionsList";
import AddSession from "../AddSession";
import QuestionsList from "../QuestionsList";
import Analytics from "../Analytics";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [selectedPage, setSelectedPage] = useState("user-data"); // Initially selected page

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="adminapp-container">
      <Container fluid className="admincontent-container">
        <Row>
          <Col md={2} className="sidebar">
            <Sidebar
              onSelectPage={handlePageChange}
              selectedPage={selectedPage}
            />
          </Col>
          <Col md={9} className="admincontent">
            {selectedPage === "analytics" && <Analytics />}
            {selectedPage === "students" && <StudentsList />}
            {selectedPage === "addstudents" && <AddStudent />}
            {selectedPage === "teachers" && <TeachersList />}
            {selectedPage === "addteachers" && <AddTeacher />}
            {selectedPage === "sessions" && <SessionsList />}
            {selectedPage === "addsession" && <AddSession />}
            {selectedPage === "questions" && <QuestionsList />}
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default AdminPanel;
