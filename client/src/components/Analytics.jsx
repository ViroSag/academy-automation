import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ".././styles/styles.css";

function Analytics() {
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

  const parseAndConvertToISO = (timeStr) => {
    const timeParts = timeStr.split(" ");
    const time = timeParts[0];
    const isPM = timeParts[1] === "PM";

    let [hours, minutes, seconds] = time.split(":").map(Number);

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }

    const isoTime = new Date();
    isoTime.setHours(hours, minutes, seconds);

    return isoTime.toISOString();
  };

  const calculateTimeDifference = (startTimee, endTimee) => {
    if (!startTimee) {
      startTimee = "12:00:00 AM";
    }
    if (!endTimee) {
      endTimee = "12:00:00 AM";
    }

    const startTimeISO = parseAndConvertToISO(startTimee);
    const endTimeISO = parseAndConvertToISO(endTimee);

    const startTime = new Date(startTimeISO);
    const endTime = new Date(endTimeISO);
    const diffInMinutes = Math.floor((endTime - startTime) / 60000);

    return diffInMinutes;
  };

  return (
    <div className="generalpage">
      <h2 className="tableheadings">Number of Students in Sessions</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Session Subject</th>
            <th>Date</th>
            <th>Time</th>
            <th>Tutors</th>
            <th>Number of Students Attended</th>
            <th>Max Students Limit</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td>{session.subject}</td>
              <td>{session.date}</td>
              <td>
                {session.starttime} to {session.endtime}
              </td>
              <td>
                {session.tutors.map((tutor, index) => tutor.name).join(", ")}
              </td>
              <td>{session.students.length}</td>
              <td>{session.studentslimit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="tableheadings">Questions in Sessions</h2>
      {Object.keys(questions).map((sessionRef) => (
        <div key={sessionRef}>
          <h3>Session Details:</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>Session Subject</th>
                <th>Session Date</th>
                <th>Session Time</th>
                <th>Session Tutors</th>
                <th>Number of Students in Session</th>
                <th>Max Students Limit</th>
              </tr>
            </thead>
            <tbody>
              {sessions
                .filter((session) => session._id === sessionRef)
                .map((session, index) => (
                  <tr key={index}>
                    <td>{session.subject}</td>
                    <td>{session.date}</td>
                    <td>
                      {session.starttime} to {session.endtime}
                    </td>
                    <td>
                      {session.tutors
                        .map((tutor, index) => tutor.name)
                        .join(", ")}
                    </td>
                    <td>{session.students.length}</td>
                    <td>{session.studentslimit}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h3>Questions in this Session:</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>Question Topic</th>
                <th>Question Statement</th>
                <th>Question Time Asked</th>
                <th>Answered By</th>
                <th>Tutor's Time Required</th>
              </tr>
            </thead>
            <tbody>
              {questions[sessionRef].map((question, index) => (
                <tr key={index}>
                  <td>{question.questiontopic}</td>
                  <td>{question.questionstatement}</td>
                  <td>{question.timeasked}</td>
                  <td>{tutorNames[question.tutorref]}</td>
                  <td>
                    {calculateTimeDifference(
                      question.starttime,
                      question.endtime
                    )}{" "}
                    minutes
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Analytics;
