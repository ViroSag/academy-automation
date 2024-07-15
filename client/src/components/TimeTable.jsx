import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ".././styles/styles.css";

function TimeTable() {
  const [sessions, setSessions] = useState([]);
  const [tutorNames, setTutorNames] = useState({});
  const currentDate = new Date();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/sessions";
    const tutorUrl = "http://localhost:4000/teachers";

    axios
      .get(url)
      .then((response) => {
        const sessionDocuments = response.data;

        sessionDocuments.sort((a, b) => a.date - b.date);

        setSessions(sessionDocuments);

        const tutorIds = sessionDocuments.reduce(
          (ids, session) => [...ids, ...session.tutors],
          []
        );
        return axios.get(tutorUrl, { params: { ids: tutorIds } });
      })
      .then((tutorResponse) => {
        const tutorData = tutorResponse.data.reduce((tutors, tutor) => {
          tutors[tutor._id] = tutor.name;
          return tutors;
        }, {});
        setTutorNames(tutorData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const questionUrl = "http://localhost:4000/questions";
    axios
      .get(questionUrl)
      .then((response) => {
        const groupedQuestions = response.data.reduce((grouped, question) => {
          if (!grouped[question.sessionref]) {
            grouped[question.sessionref] = [];
          }
          grouped[question.sessionref].push(question);
          return grouped;
        }, {});
        setQuestions(groupedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });

    axios
      .get(tutorUrl)
      .then((tutorResponse) => {
        setTutors(tutorResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching tutor data:", error);
      });
  }, []);

  const isToday = (sessionDate) => {
    const sessionDateObj = new Date(sessionDate);
    return (
      sessionDateObj.getDate() === currentDate.getDate() &&
      sessionDateObj.getMonth() === currentDate.getMonth() &&
      sessionDateObj.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <div className="timetablepage">
      <h2 className="tableheadings">Tutor Timetable</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Tutor Name</th>
            <th>Scheduled Sessions</th>
            <th>General Schedule</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor, index) => (
            <tr key={index}>
              <td>{tutor.name} </td>
              <td>
                <ul>
                  {sessions.filter(
                    ((session) => (session.tutors.id = tutor._id)) &&
                      ((session) =>
                        new Date(session.date) >
                        currentDate.setHours(0, 0, 0, 0))
                  ).length > 0 ? (
                    sessions
                      .filter(
                        ((session) => (session.tutors.id = tutor._id)) &&
                          ((session) =>
                            new Date(session.date) >
                            currentDate.setHours(0, 0, 0, 0))
                      )
                      .map((session) => (
                        <li key={session._id}>
                          {session.subject} - {session.date} (
                          {session.starttime} to {session.endtime})
                        </li>
                      ))
                  ) : (
                    <p>No sessions scheduled</p>
                  )}
                </ul>
              </td>
              <td>{tutor.scheduled}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimeTable;
