import React, { useState } from "react";
import qrcode from "qrcode";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import ".././styles/styles.css";

function AddStudent(props) {
  const [student, setStudent] = useState({
    name: "",
    schoolname: "",
    feepaid: "",
    age: "",
    studentid: "",
    qrimagepath: "",
  });

  const onChangeStudentName = (e) => {
    setStudent({ ...student, name: e.target.value });
  };

  const onChangeStudentSchoolName = (e) => {
    setStudent({ ...student, schoolname: e.target.value });
  };

  const onChangeStudentFeepaid = (e) => {
    setStudent({ ...student, feepaid: e.target.value });
  };
  const onChangeStudentAge = (e) => {
    setStudent({ ...student, age: e.target.value });
  };
  const onChangeStudentId = (e) => {
    setStudent({ ...student, studentid: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentdata = student.studentid;

      const qrCodeDataUrl = await qrcode.toDataURL(studentdata);

      const newStudent = {
        name: student.name,
        schoolname: student.schoolname,
        feepaid: student.feepaid,
        age: student.age,
        studentid: student.studentid,
        qrimagepath: qrCodeDataUrl,
      };

      const response = await axios.post(
        "http://localhost:4000/students/create",
        newStudent
      );

      toast.success("Successfully added new Student");
      console.log(response.data);

      setStudent({
        name: "",
        schoolname: "",
        feepaid: "",
        age: "",
        studentid: "",
        qrimagepath: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went Wrong, please Try Again");
    }
  };

  return (
    <div className="generalpage">
      <h2>Add a New Student</h2>
      <Row>
        <Col md={4} className="formcontainer">
          <form onSubmit={onSubmit}>
            <div className="text-section">
              <label>Student Name</label>
              <input
                type="text"
                value={student.name}
                onChange={onChangeStudentName}
                className="form-control"
              />
            </div>

            <div className="text-section">
              <label>School Name</label>
              <input
                type="text"
                value={student.schoolname}
                onChange={onChangeStudentSchoolName}
                className="form-control"
              />
            </div>
            <div className="text-section">
              <label>Fee Paid</label>
              <input
                type="text"
                value={student.feepaid}
                onChange={onChangeStudentFeepaid}
                className="form-control"
              />
            </div>
            <div className="text-section">
              <label>Age</label>
              <input
                type="text"
                value={student.age}
                onChange={onChangeStudentAge}
                className="form-control"
              />
            </div>
            <div className="text-section">
              <label>ID</label>
              <input
                type="text"
                value={student.studentid}
                onChange={onChangeStudentId}
                className="form-control"
              />
            </div>

            <div className="text-section">
              <input
                type="submit"
                value="Register Student"
                className="signin-button"
              />
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default AddStudent;
