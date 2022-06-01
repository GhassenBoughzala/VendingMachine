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
  FormGroup,
  Input,
  Table,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import {
  addProduct,
  addQnt,
  deleteProduct,
} from "../redux/products/productsActions";

const initialFieldValues = {
  title: "",
  price: "",
  img: "",
  quantity: "",
};

const Admin = ({ ...props }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialFieldValues);
  const { title, price, img, quantity } = data;

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(data));
    setData(initialFieldValues);
    setshowAdd(false);
  };

  const [showAdd, setshowAdd] = useState(false);
  const [showList, setshowList] = useState(false);
  const [access, setAccess] = useState(false);
  const [token, setToken] = useState({ code: "", access:"OFF" });

  const handleToken = (name) => (event) => {
    setToken({ ...token, [name]: event.target.value });
    if(event.target.value === "1998"){
      setAccess(true);
      setToken({...token ,access: "ON"})
    }else{
      setAccess(false)
    }
  };

  useEffect(() => {
    if (showAdd) {
      setshowList(false);
    } else {
      setshowList(true);
    }
  }, [showAdd, showList]);

  const onDLP = (id) => {
    const onSuccess = () => {
      window.location.reload();
    };
    if (window.confirm("Are you sure ?"))
      dispatch(deleteProduct(id, onSuccess));
  };

  const plusQnt = (id) => {
    dispatch(addQnt(id));
  };

  return (
    <Card className="bg-white">
      <Row>
        <Col className="order-xl-1 mb-5 mb-xl-0">
          <Button
            className="border-0 shadow-none bg-transparent"
            size="sm"
            type="Reset"
            onClick={() => {
              props.setshowAdmin(false);
            }}
          >
            <i className="fas fa-times fa-2x text-danger"></i>
          </Button>
        </Col>
      </Row>
      {!access && (
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 bg-white">
          <div className="d-flex justify-content-between"></div>
          <h1 className="mb-0 text-danger">ACESS CODE</h1>
          <div className="m-2">
            <Input
              color="text-center"
              type="text"
              value={token.code}
              name="code"
              onChange={handleToken("code")}
            />
           {token.access === "OFF" ?  <h5 className="mb-0 text-danger">Access OFF</h5> : <h5 className="mb-0 text-success">Access ON</h5> }
          </div>
        </CardHeader>
      )}

      {access && (
        <>
          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 bg-white">
            <div className="d-flex justify-content-between"></div>
            <h1 className="mb-0 text-danger">Admin space</h1>
            <div className="m-2">
              <Button
                color="btn btn-outline-dark"
                size="sm"
                onClick={() => setshowAdd(true)}
              >
                Add Product
              </Button>
            </div>
          </CardHeader>
          {showAdd && (
            <CardBody>
              <Form role="form" onSubmit={onSubmit}>
                <Row className="justify-content-center text-center">
                  <Col lg="6">
                    <FormGroup>
                      <label className="form-control-label text-dark">
                        Title
                      </label>
                      <Input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange("title")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label className="form-control-label text-dark">
                        Quantity
                      </label>
                      <Input
                        type="number"
                        min="1"
                        name="quantity"
                        value={quantity}
                        onChange={handleChange("quantity")}
                      />
                    </FormGroup>
                    <Button color="btn btn-success" type="submit">
                      confirm
                    </Button>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label className="form-control-label text-dark">
                        Price
                      </label>
                      <Input
                        min={1}
                        type="number"
                        step="0.1"
                        name="price"
                        value={price}
                        onChange={handleChange("price")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label className="form-control-label text-dark">
                        Image URL
                      </label>
                      <Input
                        type="text"
                        name="img"
                        value={img}
                        onChange={handleChange("img")}
                      />
                    </FormGroup>

                    <Button
                      color="btn btn-danger"
                      onClick={() => setshowAdd(false)}
                    >
                      cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          )}
          {showList && (
            <CardBody>
              <Table
                className="align-items-center border-dark table-colors "
                striped
                responsive
              >
                <thead className="border-dark">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Qnt</th>
                    <th scope="col">Price </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="border-dark">
                  {props.products.map((p, index) => {
                    return (
                      <Fragment key={index}>
                        <tr key={p._id}>
                          <td>{p.title}</td>
                          <td>{p.quantity}</td>
                          <td>{p.price}</td>
                          <td>
                            <>
                              <Button
                                className="btn btn-outline-danger"
                                size="sm"
                                onClick={() => onDLP(p._id.toString())}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                              <Button
                                className="btn btn-outline-default"
                                size="sm"
                                onClick={() => plusQnt(p._id)}
                              >
                                <i className="fas fa-plus"></i>
                              </Button>
                            </>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          )}
        </>
      )}
    </Card>
  );
};

export default Admin;
