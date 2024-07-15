import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function SessionsList() {
  const [sessions, setSessions] = useState([]);
  const [tutorNames, setTutorNames] = useState({});
  const currentDate = new Date();
  const navigate = useNavigate();

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
  }, []);

  const isToday = (sessionDate) => {
    const sessionDateObj = new Date(sessionDate);
    return (
      sessionDateObj.getDate() === currentDate.getDate() &&
      sessionDateObj.getMonth() === currentDate.getMonth() &&
      sessionDateObj.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleButtonClick = (session) => {
    const updatedSession = { ...session, isactive: true };

    axios
      .put(
        `http://localhost:4000/sessions/update/${session._id}`,
        updatedSession
      )
      .then((response) => {
        console.log("Session updated:", response.data);

        const updatedSessions = sessions.map((s) =>
          s._id === session._id ? updatedSession : s
        );
        setSessions(updatedSessions);

        navigate(`/sessions/as-tutor/${session._id}`);
      })
      .catch((error) => {
        console.error("Error updating session:", error);
      });
  };

  const handleQRScanClick = (sessionId) => {
    navigate(`/qrscanner/${sessionId}`);
  };

  return (
    <div className="generalpage">
      <h2>Sessions List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
            <th>Tutors</th>
            <th>Number of Students Attended</th>
            <th>Max Students Limit</th>
            <th>Action</th>
            <th>QR Scan</th>
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
              <td>
                {isToday(session.date) ? (
                  <button
                    className="activebuttonadmin"
                    onClick={() => handleButtonClick(session)}
                  >
                    Start the Session
                  </button>
                ) : (
                  <button className="pausedbuttonadmin" disabled>
                    Session Closed
                  </button>
                )}
              </td>
              <td>
                {isToday(session.date) ? (
                  <button
                    className="activebuttonadmin"
                    onClick={() => handleQRScanClick(session._id)}
                  >
                    Start QR Scan
                  </button>
                ) : (
                  <button className="pausedbuttonadmin" disabled>
                    Session Closed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SessionsList;
