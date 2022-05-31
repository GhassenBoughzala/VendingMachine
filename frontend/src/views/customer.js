/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
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
  display: "Deposit Coins",
};
const Customer = ({ ...props }) => {
  const btn = {
    height: 50,
    width: 120,
  };

  const [values, setValues] = useState(InitialValues);

  const reset = () => {
    props.setAvailable(false);
    setValues(InitialValues);
  };

  function increment20Value() {
    var value20 = parseFloat(document.getElementById("20ct").value);
    setValues({ ...values ,currentAmount: values.currentAmount + value20 });
  }

  function increment50Value() {
    var value50 = parseFloat(document.getElementById("50ct").value);
    setValues({ ...values ,currentAmount: values.currentAmount + value50 });
  }

  function increment10Value() {
    var value10 = parseFloat(document.getElementById("10ct").value);
    setValues({ ...values ,...values ,currentAmount: values.currentAmount + value10 });
  }

  function increment05Value() {
    var value05 = parseFloat(document.getElementById("05ct").value);
    setValues({ ...values ,currentAmount: values.currentAmount + value05 });
  }

  function increment02Value() {
    var value02 = parseFloat(document.getElementById("02ct").value);
    setValues({ ...values ,changeAmount: values.changeAmount + value02 });
  }

  function increment01Value() {
    var value01 = parseFloat(document.getElementById("01ct").value);
    setValues({ ...values ,changeAmount: values.changeAmount + value01 });
  }

  console.log(values.changeAmount);
  console.log(values.currentAmount);

  return (
    <Card className="border-dark bg-gradient-dark productcard">
      <CardHeader className="text-center bg-gradient-dark ">
        <h2 className="text-red">{values.display}</h2>
      </CardHeader>
      <CardBody className="border-white">
        <Row className="justify-content-center">
          <h4 className="text-white">
            Current amount: {values.currentAmount.toString().substring(0, 4)} €
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
            <h4 className="text-white">Select product</h4>
            <div className="d-flex align-items-start">
              {props.products.map((p, index) => {
                return (
                  <Fragment key={index}>
                    <Button
                      color="btn btn-outline-white"
                      onClick={() => {
                        return (
                          props.setAvailable(true), props.setcurrentIndex(index)
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
          <Col xl="5">
            <Button color="btn btn-outline-white">Coin return</Button>
          </Col>
          <Col xl="5">
            <Button color="btn btn-outline-white" 
            onClick={() => {
                setValues({...values, changeAmount: 0})
            }}>Take change {values.changeAmount.toString().substring(0, 4)} €</Button>
          </Col>
        </Row>
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
  );
};

export default Customer;
