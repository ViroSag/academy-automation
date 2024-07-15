import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TodaysQuestions from "./TodaysQuestions";
import ".././styles/styles.css";

function CurrentSessionAsTutor() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [presentStudents, setPresentStudents] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/sessions/${sessionId}`
        );
        setSession(response.data);

        setPresentStudents(response.data.students.length);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());

      fetchSessionData();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [sessionId]);

  const deactivateSession = async () => {
    try {
      await axios.put(`http://localhost:4000/sessions/deactivate/${sessionId}`);
    } catch (error) {
      console.error("Error deactivating the session:", error);
    }

    navigate("/");
  };

  return (
    <div className="generalpage">
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="formcontainer">
          {session ? (
            <div>
              <h1 className="tableheadings">Welcome to the Class!</h1>
              <h2 className="tableheadings">Session Details</h2>
              <table className="user-table">
                <tbody>
                  <tr>
                    <td className="main-table-left-col">Date</td>
                    <td>{session.date}</td>
                  </tr>
                  <tr>
                    <td className="main-table-left-col">Start Time</td>
                    <td>{session.starttime}</td>
                  </tr>
                  <tr>
                    <td className="main-table-left-col">End Time</td>
                    <td>{session.endtime}</td>
                  </tr>
                  <tr>
                    <td className="main-table-left-col">Tutors</td>
                    <td>
                      {session.tutors.map((tutor) => tutor.name).join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td className="main-table-left-col">Students Limit</td>
                    <td>{session.studentslimit}</td>
                  </tr>
                  <tr>
                    <td className="main-table-left-col">Present Students</td>
                    <td>{presentStudents}</td>
                  </tr>
                  <tr>
                    <td className="main-table-left-col">Subject</td>
                    <td>{session.subject}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="tableheadings">Loading session details...</p>
          )}
        </Col>

        <Col md={3}>
          <div className="clock">
            <p>Current Time: {currentTime.toLocaleTimeString()}</p>

            <button onClick={deactivateSession} className="signin-button">
              Deactivate Session
            </button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          {session ? (
            <TodaysQuestions sessionId={session._id} />
          ) : (
            <p className="tableheadings">Loading session details...</p>
          )}
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}

export default CurrentSessionAsTutor;
