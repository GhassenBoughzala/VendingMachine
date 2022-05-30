import { Row, Col, Container, Card, CardBody, CardHeader } from "reactstrap";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


const Home = () => {
  const [List, setList] = useState([]);

  return (
    <div className="main-content w-100vh h-100vh my-3">
      <Container>
        <Row>
          <Col className="order-xl-1 mb-5 mb-xl-0" xl="4">
            <Card className="border-dark">
              <CardHeader>
                <h1 className=" text-red ">HELLO</h1>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1 mb-5 mb-xl-0" xl="4">
            <h1 className=" text-red ">HELLO</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
