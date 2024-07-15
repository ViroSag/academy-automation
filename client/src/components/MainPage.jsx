import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import coverImage from "../assets/images/mainpagecover.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import ".././styles/styles.css";

function MainPage() {
  const [activeSessions, setActiveSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/sessions/active/active")
      .then((response) => {
        const activeSessionsData = response.data;
        setActiveSessions(activeSessionsData);
      })
      .catch((error) => {
        console.error("Error fetching active session data:", error);
      });
  }, []);

  console.log(activeSessions);

  return (
    <div className="generalpage">
      <Row>
        <Col md={2}></Col>
        <Col md={8} className="mainpage">
          <Row>
            <div className="mainpagecover">
              <img
                src={coverImage}
                className="mainpagecoverimg"
                alt="mainpagecover"
              />
            </div>
          </Row>
          <Row>
            <div>
              <div className="mainpagelinkstwo">
                <Link to={"/timetable"}>Time Table</Link>

                <Link to={"/adminpanel"}>Admin Panel</Link>
              </div>
            </div>

            <div>
              {activeSessions.length > 0 ? (
                <div>
                  <h1 className="tableheadings">Active Sessions Details</h1>
                  {activeSessions.map((activeSession, index) => (
                    <div key={index}>
                      <table className="main-table">
                        <tbody>
                          <tr>
                            <td className="main-table-left-col">Subject</td>
                            <td>{activeSession.subject}</td>
                          </tr>
                          <tr>
                            <td className="main-table-left-col">Date</td>
                            <td>{activeSession.date}</td>
                          </tr>
                          <tr>
                            <td className="main-table-left-col">Time</td>
                            <td>
                              {activeSession.starttime} to{" "}
                              {activeSession.endtime}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p className="tableheadings">Join as:</p>
                      <div className="mainpagelinkstwo">
                        <Link to={`/sessions/as-tutor/${activeSession._id}`}>
                          Tutor
                        </Link>
                        <Link to={`/sessions/as-student/${activeSession._id}`}>
                          Student
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h3 className="mainpagetext">No sessions are currently open</h3>
              )}
            </div>
          </Row>
        </Col>
        <Col md={2}></Col>
      </Row>
      <Footer />
    </div>
  );
}

export default MainPage;
