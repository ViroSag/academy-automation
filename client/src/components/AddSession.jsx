import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import ".././styles/styles.css";

function AddSession(props) {
  const [session, setSession] = useState({
    date: "",
    starttime: "",
    endtime: "",
    tutors: [],
    students: [],
    studentslimit: "",
    subject: "",
    isactive: false,
  });

  const [tutorOptions, setTutorOptions] = useState([]);
  const [selectedTutors, setSelectedTutors] = useState([]);

  const onChangeSessionDate = (e) => {
    setSession({ ...session, date: e.target.value });
  };

  const onChangeSessionStartTime = (e) => {
    setSession({ ...session, starttime: e.target.value });
  };
  const onChangeSessionEndTime = (e) => {
    setSession({ ...session, endtime: e.target.value });
  };
  const onChangeSessionSubject = (e) => {
    setSession({ ...session, subject: e.target.value });
  };

  const onChangeSessionStudentsLimit = (e) => {
    setSession({ ...session, studentslimit: e.target.value });
  };

  const handleTutorSelectChange = (selectedOptions) => {
    setSelectedTutors(selectedOptions);
    const tutorInfo = selectedOptions.map((tutor) => ({
      id: tutor.value,
      name: tutor.label,
    }));
    setSession({ ...session, tutors: tutorInfo });
  };

  const loadTutors = async () => {
    try {
      const response = await axios.get("http://localhost:4000/teachers");
      const tutorData = response.data.map((tutor) => ({
        value: tutor._id,
        label: tutor.name, // You can use any tutor property here
      }));
      setTutorOptions(tutorData);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const newSession = {
        date: session.date,
        starttime: session.starttime,
        endtime: session.endtime,
        tutors: session.tutors,
        students: session.students,
        studentslimit: session.studentslimit,
        subject: session.subject,
        isactive: session.isactive,
      };
      const response = await axios.post(
        "http://localhost:4000/sessions/create",
        newSession
      );

      console.log(response.data);

      setSession({
        date: "",
        starttime: "",
        endtime: "",
        tutors: [],
        students: [],
        studentslimit: "",
        subject: "",
        isactive: false,
      });
      setSelectedTutors([]);
      toast.success("Successfully added new Session");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went Wrong, please Try Again");
    }
  };

  useEffect(() => {
    loadTutors();
  }, []);

  return (
    <div className="generalpage">
      <h2>Add a New Session</h2>
      <Row>
        <Col md={4} className="formcontainer">
          <form onSubmit={onSubmit}>
            <div className="text-section">
              <label>Session Date</label>
              <input
                type="date"
                value={session.date}
                onChange={onChangeSessionDate}
                className="form-control"
              />
            </div>

            <div className="text-section">
              <label>Session Start Time</label>
              <input
                type="time"
                value={session.starttime}
                onChange={onChangeSessionStartTime}
                className="form-control"
              />
            </div>
            <div className="text-section">
              <label>Session End Time</label>
              <input
                type="time"
                value={session.endtime}
                onChange={onChangeSessionEndTime}
                className="form-control"
              />
            </div>

            <div className="text-section">
              <label>Subject</label>
              <input
                type="text"
                value={session.subject}
                onChange={onChangeSessionSubject}
                className="form-control"
              />
            </div>
            <div className="text-section">
              <label>Tutors</label>
              <Select
                options={tutorOptions}
                isMulti
                value={selectedTutors}
                onChange={handleTutorSelectChange}
              />
            </div>
            <div className="text-section">
              <label>Maximum Number of Students</label>
              <input
                type="text"
                value={session.studentslimit}
                onChange={onChangeSessionStudentsLimit}
                className="form-control"
              />
            </div>

            <div className="text-section">
              <input
                type="submit"
                value="Add Session"
                className="signin-button"
              />
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default AddSession;
