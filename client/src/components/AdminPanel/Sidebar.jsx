import React from "react";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const Sidebar = ({ onSelectPage, selectedPage }) => {
  const navigate = useNavigate();
  return (
    <Nav className="flex-column adminsidebar-nav">
      <Nav.Link
        onClick={() => onSelectPage("analytics")}
        active={selectedPage === "analytics"}
      >
        Analytics
      </Nav.Link>
      <Nav.Link
        onClick={() => onSelectPage("students")}
        active={selectedPage === "students"}
      >
        Students Data
      </Nav.Link>
      <Nav.Link
        onClick={() => onSelectPage("addstudents")}
        active={selectedPage === "addstudents"}
      >
        Add a New Student
      </Nav.Link>
      <Nav.Link
        onClick={() => onSelectPage("teachers")}
        active={selectedPage === "teachers"}
      >
        Teachers Data
      </Nav.Link>

      <Nav.Link
        onClick={() => onSelectPage("addteachers")}
        active={selectedPage === "addteachers"}
      >
        Add a New Teacher
      </Nav.Link>
      <Nav.Link
        onClick={() => onSelectPage("sessions")}
        active={selectedPage === "sessions"}
      >
        Sessions Data
      </Nav.Link>

      <Nav.Link
        onClick={() => onSelectPage("addsession")}
        active={selectedPage === "addsession"}
      >
        Add a New Session
      </Nav.Link>
      <Nav.Link
        onClick={() => onSelectPage("questions")}
        active={selectedPage === "questions"}
      >
        All Questions
      </Nav.Link>
      <Nav.Link onClick={() => navigate("/")}>Go Back to Main Page</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
