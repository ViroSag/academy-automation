import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import socket from "./socket";
import ".././styles/styles.css";

function CurrentSessionAsStudent() {
  const { sessionId } = useParams();
  const [question, setQuestion] = useState({
    sessionref: sessionId,
    subject: "",
    questionstatement: "",
    questiontopic: "",
    answered: false,
    studentref: "",
    tutorref: "",
    timeasked: "",
    dateasked: "",
    starttime: null,
    endtime: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0];
    const time = currentDate.toLocaleTimeString();

    const sessionInfo = await axios.get(
      `http://localhost:4000/sessions/${sessionId}`
    );
    const sessionData = sessionInfo.data;

    const isStudentPartOfSession = sessionData.students.includes(
      question.studentref
    );

    if (!isStudentPartOfSession) {
      alert("Sorry, you are not a part of the current session");
      return;
    }

    const updatedQuestion = {
      ...question,
      subject: sessionData.subject,
      tutorref: sessionData.tutors[0].id,

      dateasked: date,
      timeasked: time,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/questions/create",
        updatedQuestion
      );

      socket.emit("newQuestion", response.data);

      console.log(response.data);

      setQuestion({
        ...question,
        questionstatement: "",
        questiontopic: "",
        studentref: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="generalpage">
      <Row>
        <Col md={4}></Col>
        <Col md={4} className="formcontainer sessionasstudent">
          <h1 className="tableheadings">
            Welcome Dear Student. You can Ask any Question!
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="text-section">
              <label>Question Topic</label>
              <input
                type="text"
                name="questiontopic"
                value={question.questiontopic}
                onChange={handleInputChange}
                className="email"
              />
            </div>
            <div className="text-section">
              <label>Question Statement</label>
              <textarea
                name="questionstatement"
                value={question.questionstatement}
                onChange={handleInputChange}
                className="email"
              />
            </div>
            <div className="text-section">
              <label>Student Reference Number</label>
              <input
                type="text"
                name="studentref"
                value={question.studentref}
                onChange={handleInputChange}
                className="email"
              />
            </div>
            <button type="submit" className="signin-button">
              Submit Question
            </button>
          </form>
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}

export default CurrentSessionAsStudent;
