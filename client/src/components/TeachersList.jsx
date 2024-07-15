import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TeachersList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/teachers";

    axios
      .get(url)
      .then((response) => {
        const teacherDocuments = response.data;

        teacherDocuments.sort((a, b) => a.name - b.name);

        setTeachers(teacherDocuments);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, []);

  return (
    <div className="generalpage">
      <h2>Teachers List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Scheduled</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index}>
              <td>{teacher.teacherid}</td>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>{teacher.scheduled}</td>
              <td>
                <img src={teacher.qrimagepath} alt="QR Code" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeachersList;
