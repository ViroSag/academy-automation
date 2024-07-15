import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/students";

    axios
      .get(url)
      .then((response) => {
        const studentDocuments = response.data;

        studentDocuments.sort((a, b) => a.name - b.name);

        setStudents(studentDocuments);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  return (
    <div className="generalpage">
      <h2>Student List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>School</th>
            <th>Fee Status</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.studentid}</td>
              <td>{student.name}</td>
              <td>{student.schoolname}</td>
              <td>{student.feepaid}</td>
              <td>
                <img src={student.qrimagepath} alt="QR Code" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsList;
