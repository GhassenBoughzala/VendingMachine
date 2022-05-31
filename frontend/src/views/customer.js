/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  Button,
  CardFooter,
} from "reactstrap";

const Customer = ({ ...props }) => {
  const img = {
    height: 50,
    width: 120,
  };

  const [values, setValues] = useState({
    totalCoins: [10, 20, 50],
    insertedCoins: [],
    currentAmount: 0.0,
    coinReturn: [],
    productReturn: [],
    display: "Deposit Coins",
    coins: [],
  });

  const reset = () => {
    props.setAvailable(false);
  };

  return (
    <Card className="border-dark bg-gradient-dark productcard">
      <CardHeader className="text-center bg-gradient-dark border-danger">
        <h2 className="text-red">" {values.display} "</h2>
      </CardHeader>
      <CardBody className="border-white">
        <Row className="justify-content-center">
          <h4 className="text-white">
            Current amount: {values.currentAmount} €
          </h4>

          <div className="py-3">
            <div className="d-flex align-items-start">
              <Button color="btn btn-outline-white" value={0.2} style={img}>
                20 cent
              </Button>
              <Button color="btn btn-outline-white" value={0.5} style={img}>
                50 cent
              </Button>
            </div>
            <div className="d-flex align-items-start py-2">
              <Button color="btn btn-outline-white" value={0.1} style={img}>
                10 cent
              </Button>
              <Button color="btn btn-outline-white" value={0.05} style={img}>
                5 cent
              </Button>
            </div>
            <div className="d-flex align-items-start">
              <Button color="btn btn-outline-white" value={0.02} style={img}>
                2 cent
              </Button>
              <Button color="btn btn-outline-white" value={0.01} style={img}>
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
                    {props.currentIndex === index && props.Available ? (
                      <Button
                        color="btn btn-outline-success"
                        onClick={() => {
                          return (
                            props.setAvailable(true),
                            props.setcurrentIndex(index)
                          );
                        }}
                      >
                        {index + 1}
                      </Button>
                    ) : (
                      <Button
                        disabled
                        color="btn btn-outline-danger"
                        onClick={() => {
                          return (
                            props.setAvailable(true),
                            props.setcurrentIndex(index)
                          );
                        }}
                      >
                        {index + 1}
                      </Button>
                    )}
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
            <Button color="btn btn-outline-white">Take change</Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
};

export default Customer;
