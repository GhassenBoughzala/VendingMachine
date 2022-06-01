
/* eslint-disable no-sequences */
/* eslint-disable no-cond-assign */
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
    Form,
  } from "reactstrap";

const Admin = ({...props}) => {
    return(
        <Card className="productcard">
        <Row>
          <Col className="order-xl-1 mb-5 mb-xl-0">
            <Button
              className="border-0 shadow-none bg-transparent"
              size="sm"
              type="Reset"

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
          <Form role="form">
           
          </Form>
        </CardBody>
      </Card>
    )
}

export default Admin