import React, { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useParams } from "react-router-dom";
import ".././styles/styles.css";

function QRScanner() {
  const [scannedData, setScannedData] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [status, setStatus] = useState(null);
  const { sessionId } = useParams();

  const handleScan = async (data) => {
    console.log("Scanned data");
    if (data) {
      setScannedData(data);
      console.log(data.text);

      try {
        const response = await axios.get(
          `http://localhost:4000/students/${data.text}`
        );

        if (response.data) {
          setStudentInfo(response.data);

          await axios.put(
            `http://localhost:4000/sessions/${sessionId}/${data.text}`,
            {}
          );
        } else {
          setStudentInfo(null);
        }
      } catch (err) {
        console.error("Error fetching session information:", err);
        setStatus(err.message);
      }
    }
  };

  const handleError = (error) => {
    console.error("Error with QR code scanner:", error);
    setStatus(error);
  };

  return (
    <div>
      <Row>
        <Col md={6} xs={12} sm={12} className="leftside">
          <QrScanner onResult={handleScan} onError={handleError} />
        </Col>
        <Col md={5} xs={5} sm={5} className="rightside">
          {scannedData && studentInfo && (
            <div className="centered-container">
              <h2 className="tableheadings">Student Information</h2>
              <table className="main-table">
                <tbody>
                  <tr>
                    <td className="main-table-left-col">Name</td>
                    <td>{studentInfo.name}</td>
                  </tr>
                  <tr>
                    <td className="main-table-left-col">School Name</td>
                    <td>{studentInfo.schoolname}</td>
                  </tr>
                  <tr>
                    <td className="main-table-left-col">Age</td>
                    <td>{studentInfo.age}</td>
                  </tr>

                  <tr>
                    <td className="main-table-left-col">Student ID</td>
                    <td>{studentInfo.studentid}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default QRScanner;
