/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import "../components/card.css";
import "../components/Loading/loading.css";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { allProducts } from "../redux/products/productsActions";
import Customer from "./customer";

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);
const randomDuration = () => Math.random() * 0.07 + 0.23;
const variants = {
  start: (i) => ({
    rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
    transition: {
      delay: getRandomDelay(),
      repeat: Infinity,
      duration: randomDuration(),
    },
  }),
  reset: {
    rotate: 0,
  },
};

const Home = ({ ...props }) => {
  const controls = useAnimation();

  useEffect(() => {
    props.All();
  }, []);

  const products = props.List;
  const [Available, setAvailable] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(-1);

  return (
    <div className="main-content w-100vh h-100vh py-6 bg-gradient-red">
      <Container>
        <Row>
          <Col className="order-xl-1 mb-5 mb-xl-0" xl="7">
            <Card className="border-dark bg-gradient-dark productcard">
              <Row className="justify-content-center py-2 px-2 ">
                <Col>
                  <Button
                    color="btn btn-outline-white"
                    //onClick={() => setCurrentId(user._id)}
                    size="sm"
                  >
                    <i className="fas fa-tools"></i>
                  </Button>
                </Col>
              </Row>
              <CardHeader className="text-center bg-gradient-dark">
                <h1 className=" text-white ">Vending Machine</h1>
              </CardHeader>
              {props.isLoading ? (
                <div className="text-center justify-content-center my-5">
                  <div id="loading"></div>
                </div>
              ) : (
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
                            {currentIndex === index && Available ? (
                              <motion.div
                                animate={{
                                  scale: 1.06,
                                }}
                              >
                                <Card className="m-2 productcard extraborder">
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

                                      <h3 className="text-danger ">
                                        {p.price} €
                                      </h3>
                                      <h3 className="text-white ">
                                        - {index + 1} -
                                      </h3>
                                    </div>
                                  </CardBody>
                                </Card>
                              </motion.div>
                            ) : (
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

                                    <h3 className="text-danger ">
                                      {p.price} €
                                    </h3>
                                    <h3 className="text-white ">
                                      - {index + 1} -
                                    </h3>
                                  </div>
                                </CardBody>
                              </Card>
                            )}
                          </motion.div>
                        </Fragment>
                      );
                    })}
                  </Row>
                </CardBody>
              )}
            </Card>
          </Col>
          <Col className="order-xl-1 mb-5 mb-xl-0 " xl="4">
            <Customer
              {...{
                Available,
                setAvailable,
                products,
                currentIndex,
                setcurrentIndex,
              }}
            />
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
