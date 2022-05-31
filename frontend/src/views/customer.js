/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  Button,
  CardFooter,
  Form,
} from "reactstrap";

const InitialValues = {
  currentAmount: 0,
  changeAmount: 0,
  required: 0,
  display: "Deposit Coins",
};

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "100vh", opacity: 0 },
  visible: {
    y: "100px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Customer = ({ ...props }) => {
  const btn = {
    height: 50,
    width: 120,
  };

  const [values, setValues] = useState(InitialValues);
  const [currentObj, setCurrentObj] = useState({});
  const [correct, setCorrect] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    props.update(props.currentObj._id, values);
    props.setShowModal(false);
  };

  const reset = () => {
    props.setAvailable(false);
    setValues(InitialValues);
    setCurrentObj({});
    setCorrect(false);
  };

  function increment20Value() {
    var value20 = parseFloat(document.getElementById("20ct").value);
    setValues({ ...values, currentAmount: values.currentAmount + value20 });
  }

  function increment50Value() {
    var value50 = parseFloat(document.getElementById("50ct").value);
    setValues({ ...values, currentAmount: values.currentAmount + value50 });
  }

  function increment10Value() {
    var value10 = parseFloat(document.getElementById("10ct").value);
    setValues({ ...values, currentAmount: values.currentAmount + value10 });
  }

  function increment05Value() {
    var value05 = parseFloat(document.getElementById("05ct").value);
    setValues({ ...values, currentAmount: values.currentAmount + value05 });
  }

  function increment02Value() {
    var value02 = parseFloat(document.getElementById("02ct").value);
    setValues({ ...values, changeAmount: values.changeAmount + value02 });
  }

  function increment01Value() {
    var value01 = parseFloat(document.getElementById("01ct").value);
    setValues({ ...values, changeAmount: values.changeAmount + value01 });
  }

  useEffect(() => {
    if (props.Available) {
      if (values.currentAmount >= parseFloat(currentObj.price)) {
        setValues({
          ...values,
          changeAmount: values.currentAmount - parseFloat(currentObj.price),
          display: `CHECK YOUR CHANGE`,
        });
        setCorrect(true);
      } else {
        setValues({
          ...values,
          required: parseFloat(currentObj.price),
          display: `PRICE ${currentObj.price} €`,
        });
      }
    }
  }, [values.changeAmount, values.currentAmount, props.Available, currentObj]);

  return (
    <>
      <Card className="border-dark bg-gradient-dark productcard">
        <CardHeader className="text-center bg-gradient-dark ">
          <h2 className="text-red">{values.display}</h2>
        </CardHeader>
        <CardBody className="border-white">
          <Row className="justify-content-center">
            <h4 className="text-white">
              Current amount: {values.currentAmount.toString().substring(0, 4)}€
            </h4>

            <div className="py-3">
              <div className="d-flex align-items-start">
                <Button
                  color="btn btn-outline-white"
                  value="0.20"
                  id="20ct"
                  style={btn}
                  onClick={() => increment20Value()}
                >
                  20 cent
                </Button>
                <Button
                  color="btn btn-outline-white"
                  value="0.50"
                  id="50ct"
                  style={btn}
                  onClick={() => increment50Value()}
                >
                  50 cent
                </Button>
              </div>
              <div className="d-flex align-items-start py-2">
                <Button
                  color="btn btn-outline-white"
                  value="0.10"
                  id="10ct"
                  style={btn}
                  onClick={() => increment10Value()}
                >
                  10 cent
                </Button>
                <Button
                  color="btn btn-outline-white"
                  value="0.05"
                  id="05ct"
                  style={btn}
                  onClick={() => increment05Value()}
                >
                  5 cent
                </Button>
              </div>
              <div className="d-flex align-items-start">
                <Button
                  color="btn btn-outline-white"
                  value="0.02"
                  id="02ct"
                  style={btn}
                  onClick={() => increment02Value()}
                >
                  2 cent
                </Button>
                <Button
                  color="btn btn-outline-white"
                  value="0.01"
                  id="01ct"
                  style={btn}
                  onClick={() => increment01Value()}
                >
                  1 cent
                </Button>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-white">Select Number</h4>
              <div className="d-flex align-items-start">
                {props.products.map((p, index) => {
                  return (
                    <Fragment key={index}>
                      <Button
                        color="btn btn-outline-white"
                        onClick={() => {
                          return (
                            props.setAvailable(true),
                            props.setcurrentIndex(index),
                            setCurrentObj(p)
                          );
                        }}
                      >
                        {index + 1}
                      </Button>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </Row>
        </CardBody>
        <CardFooter className="text-center bg-gradient-dark border-0">
          <Row className="justify-content-center">
            <Button
              color="btn btn-outline-white"
              size="sm"
              onClick={() => {
                setValues({ ...values, currentAmount: 0 });
              }}
            >
              RETURN COINS
            </Button>
            <Button
              color="btn btn-outline-white"
              size="sm"
              onClick={() => {
                setValues({ ...values, changeAmount: 0 });
              }}
            >
              Take change: {" "} 
              <span className="text-red">
                {values.changeAmount.toString().substring(0, 4)} €
              </span>
            </Button>
          </Row>
          {correct && (
            <Row className="justify-content-center m-2">
              <Button
                color="btn btn-outline-success"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Confirm
              </Button>
            </Row>
          )}
        </CardFooter>
        <Button
          color="btn-grey border-top"
          size="sm"
          onClick={() => {
            reset();
          }}
        >
          <i className="fas fa-redo text-white"></i>
        </Button>
      </Card>

      <AnimatePresence
        exitBeforeEnter
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {showModal && (
          <motion.div
            className="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Col className=" fixed-top center" xl="5">
              <motion.div variants={modal}>
                <Card className="productcard">
                  <Row>
                    <Col className="order-xl-1 mb-5 mb-xl-0">
                      <Button
                        className="border-0 shadow-none bg-transparent"
                        size="sm"
                        onClick={() => setShowModal(false)}
                      >
                        <i className="fas fa-times fa-2x text-danger"></i>
                      </Button>
                    </Col>
                  </Row>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 bg-card">
                    <div className="d-flex justify-content-between"></div>
                    <h1 className="mb-0 text-danger">thank you </h1>
                  </CardHeader>

                  <CardBody>
                    <Form role="form" onSubmit={onSubmit}>
                      <div className="text-center">
                        <img
                          className="img-fluid rounded avatar avatar-lg h-50 w-100"
                          src={currentObj.img}
                          alt=""
                        />
                        {values.changeAmount !== 0 && (
                          <Button
                            color="btn btn-outline-white"
                            onClick={() => {
                              setValues({ ...values, changeAmount: 0 });
                            }}
                          >
                            Take change: {" "} 
                            <span className="text-red">
                              {values.changeAmount.toString().substring(0, 4)} €
                            </span>
                          </Button>
                        )}
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </motion.div>
            </Col>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Customer;
