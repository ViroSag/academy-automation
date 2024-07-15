import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PreLoader from "./PreLoader";
import { Outlet } from "react-router-dom";

function AppBody() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PreLoader load={load} />

      <Row xxl={12} xl={12} lg={12} md={12} xs={12} sm={12}>
        <div className="app-container">
          <Container fluid className="content-container">
            <Row>
              <Col xxl={12} xl={12} lg={12} md={12} xs={12} sm={12}>
                <Outlet />
              </Col>
            </Row>
          </Container>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </Row>
    </>
  );
}

export default AppBody;
