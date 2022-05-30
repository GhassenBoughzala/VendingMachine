/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col, Container, Card, CardBody, CardHeader } from "reactstrap";
import "../components/card.css";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { allProducts } from "../redux/products/productsActions";

const Home = ({ ...props }) => {
  useEffect(() => {
    props.All();
  }, []);
  const products = props.List;

  return (
    <div className="main-content w-100vh h-100vh my-3 ">
      <Container>
        <Row>
          <Col className="order-xl-1 mb-5 mb-xl-0" xl="8">
            <Card className="border-dark bg-gradient-dark">
              <CardHeader className="text-center">
                <h1 className=" text-red ">Vending Machine</h1>
              </CardHeader>
              <CardBody>
                <Row xs={1} md={3} className="g-4">
                  {products.map((p, index) => {
                    return (
                      <Fragment key={index}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.5 }}
                        >
                          <Card className="m-2 productcard">
                            <CardBody>
                              <div className="text-center">
                                <h1 className="text-white">{p.title}</h1>
                                <img
                                  className="img-fluid rounded avatar avatar-lg h-50 w-100"
                                  src={p.img}
                                  alt=""
                                />
                                <h3 className="text-white ">
                                  {p.quantity} Item Left
                                </h3>
                                <div className="border-1">
                                  <h3 className="text-danger ">{p.price} €</h3>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      </Fragment>
                    );
                  })}
                </Row>
              </CardBody>
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

const mapStateToProps = (state) => ({
  List: state.products.products,
  isLoading: state.products.loading,
});

const mapActionToProps = {
  All: allProducts,
};

export default connect(mapStateToProps, mapActionToProps)(Home);
