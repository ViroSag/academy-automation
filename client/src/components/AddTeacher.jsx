import React, { useState } from "react";
import qrcode from "qrcode";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import ".././styles/styles.css";

function AddTeacher(props) {
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    scheduled: "",
    teacherid: "",
    qrimagepath: "",
  });

  const onChangeTeacherName = (e) => {
    setTeacher({ ...teacher, name: e.target.value });
  };

  const onChangeTeacherSubject = (e) => {
    setTeacher({ ...teacher, subject: e.target.value });
  };

  const onChangeTeacherScheduled = (e) => {
    setTeacher({ ...teacher, scheduled: e.target.value });
  };
  const onChangeTeacherId = (e) => {
    setTeacher({ ...teacher, teacherid: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const teacherdata = teacher.teacherid;

      const qrCodeDataUrl = await qrcode.toDataURL(teacherdata);

      const newTeacher = {
        name: teacher.name,
        subject: teacher.subject,
        scheduled: teacher.scheduled,
        teacherid: teacher.teacherid,
        qrimagepath: qrCodeDataUrl,
      };

      const response = await axios.post(
        "http://localhost:4000/teachers/create",
        newTeacher
      );

      console.log(response.data);

      setTeacher({
        name: "",
        subject: "",
        scheduled: "",
        teacherid: "",
        qrimagepath: "",
      });
      toast.success("Successfully added new Teacher");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went Wrong, please Try Again");
    }
  };

  return (
    <div className="generalpage">
      <h2>Add a New Teacher</h2>
      <Row>
        <Col md={4} className="formcontainer">
          <form onSubmit={onSubmit}>
            <div className="text-section">
              <label>Teacher Name</label>
              <input
                type="text"
                value={teacher.name}
                onChange={onChangeTeacherName}
                className="form-control"
              />
            </div>

            <div className="text-section">
              <label>Subject</label>
              <input
                type="text"
                value={teacher.subject}
                onChange={onChangeTeacherSubject}
                className="form-control"
              />
            </div>
            <div className="text-section">
              <label>Scheduled</label>
              <input
                type="text"
                value={teacher.scheduled}
                onChange={onChangeTeacherScheduled}
                className="form-control"
              />
            </div>
            <div className="text-section">
              <label>ID</label>
              <input
                type="text"
                value={teacher.teacherid}
                onChange={onChangeTeacherId}
                className="form-control"
              />
            </div>

            <div className="text-section">
              <input
                type="submit"
                value="Register Teacher"
                className="signin-button"
              />
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default AddTeacher;
