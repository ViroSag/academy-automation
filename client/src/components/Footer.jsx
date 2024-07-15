import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import logoImage from "../assets/images/footerlogo.png"; // Relative path to the image
import { FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footertop">
        <Row>
          <Col md={1}></Col>
          <Col md={2}>
            <Row>
              <img src={logoImage} className="footerlogo" alt="brand" />
            </Row>
          </Col>
          <Col md={4} className="footertopcontent">
            <Row>
              <h2 id="footertoptext">
                Our vision is to provide the best after-school tutor services
                for high school students. We are bringing the teaching staff and
                the students under one roof, encouraging a cooperative learning
                environment to boost the acadmeic output of the students.
              </h2>
            </Row>
            <Row>
              <Col className="social-iconc-footer-container">
                <a
                  className="social-iconc-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/brightboost/"
                >
                  <FaInstagram />
                </a>

                <a
                  className="social-iconc-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://web.facebook.com/brightboost"
                >
                  <FaFacebookSquare />
                </a>

                <a
                  className="social-iconc-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/brightboost/"
                >
                  <FaLinkedin className="social-iconc-footer" />
                </a>

                <a
                  className="social-iconc-footer"
                  href="mailto:info@brightboost.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEnvelope />
                </a>
              </Col>
            </Row>
          </Col>
          <Col md={5}></Col>
        </Row>
      </div>
      <div className="footerbottom">
        <Row>
          <Col md="4">
            <h3 id="footerbottomtext">| Contact Us |</h3>
          </Col>
          <Col md="8">
            <h3 id="footerbottomtext">
              Copyright &copy; {currentYear} Bright Boost - All Rights Reserved
              - Privacy Policy - Terms of Service
            </h3>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
