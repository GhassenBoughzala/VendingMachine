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
  CardFooter,
  Input,
} from "reactstrap";
import "../components/card.css";
import "../components/modal.css";
import "../components/Loading/loading.css";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../redux/products/productsActions";
import Customer from "./customer";
import Admin from "./admin";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "100vh", opacity: 0 },
  visible: {
    y: "0px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Home = ({ ...props }) => {
  const card = {
    height: 380,
    width: 190,
  };

  useEffect(() => {
    props.All();
  }, []);

  const products = props.List;
  const [Available, setAvailable] = useState(false);
  const [showAdmin, setshowAdmin] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(-1);
  const [currentObj, setCurrentObj] = useState({});

  return (
    <div className="main-content w-100vh h-100vh py-6 bg-gradient-red">
      <Container >
        <Row>
          <Col className="order-xl-1 mb-5 mb-xl-0" xl="7">
            <Card className="border-dark bg-gradient-dark productcard">
              <Row className="justify-content-center py-2 px-2 ">
                <Col>
                  <Button
                    color="btn btn-outline-white"
                    onClick={() => setshowAdmin(true)}
                    size="sm"
                  >
                    <i className="fas fa-tools"></i>
                  </Button>
                </Col>
              </Row>
              <CardHeader className="text-center bg-gradient-dark">
                <h1 className=" text-white ">Vending Machine</h1>
                <h4 className=" text-white ">currency EUR</h4>
              </CardHeader>
              {props.isLoading ? (
                <div className="text-center justify-content-center my-5">
                  <div id="loading"></div>
                </div>
              ) : (
                <CardBody>
                  <Row xs={1} md={3} className="g-4">
                    {products.slice(0,3).map((p, index) => {
                      return (
                        <Fragment key={index}>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                          >
                            {currentIndex === index && Available ? (
                              <motion.div animate={{ scale: 1.06 }}>
                                <Card
                                  className="m-2 productcard extraborder"
                                  style={card}
                                >
                                  <CardBody>
                                    <div className="text-center">
                                      <h1 className="text-white">{p.title}</h1>
                                      <img
                                        className="img-fluid rounded avatar avatar-lg h-50 w-100"
                                        src={p.img}
                                        alt=""
                                      />
                                      <h3 className="text-white ">
                                        {p.quantity} Items Left
                                      </h3>

                                      <h3 className="text-danger ">
                                        {p.price} €
                                      </h3>
                                    </div>
                                  </CardBody>
                                  <CardFooter className="bg-card text-center border-0">
                                    <h3 className="text-white ">
                                      - {index + 1} -
                                    </h3>
                                  </CardFooter>
                                </Card>
                              </motion.div>
                            ) : (
                              <Card className="m-2 productcard" style={card}>
                                {p.status !== "OutOfStock" ? (
                                  <CardBody>
                                    <div className="text-center">
                                      <h1 className="text-white">{p.title}</h1>
                                      <img
                                        className="img-fluid rounded avatar avatar-lg h-50 w-100"
                                        src={p.img}
                                        alt=""
                                      />
                                      <h3 className="text-white ">
                                        {p.quantity} Items Left
                                      </h3>

                                      <h3 className="text-danger ">
                                        {p.price} €
                                      </h3>
                                    </div>
                                  </CardBody>
                                ) : (
                                  <CardBody>
                                    <div className="text-center">
                                      <h1 className="text-white">{p.title}</h1>
                                      <img
                                        className="img-fluid rounded avatar avatar-lg h-50 w-100"
                                        src={p.img}
                                        alt=""
                                      />
                                      <h3 className="text-red">OUT OF STOCK</h3>
                                    </div>
                                  </CardBody>
                                )}

                                <CardFooter className="bg-card text-center border-0">
                                  <h3 className="text-white ">
                                    - {index + 1} -
                                  </h3>
                                </CardFooter>
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

      <AnimatePresence
        exitBeforeEnter
        showModal={showAdmin}
        setShowModal={setshowAdmin}
      >
        {showAdmin && (
          <motion.div
            className="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Col className=" fixed-top center" xl="5">
              <motion.div variants={modal}>
                <Admin
                  {...{
                    currentObj,
                    setCurrentObj,
                    showAdmin,
                    setshowAdmin,
                    products
                  }}
                />
              </motion.div>
            </Col>
          </motion.div>
        )}
      </AnimatePresence>
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
