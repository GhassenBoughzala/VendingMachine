// reactstrap components
import {
  UncontrolledCollapse,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

const LogoImg = require("../../assets/img/oo.png");
const ooredoo = require("../../assets/img/oored.png");
import { logout } from "redux/auth/authActions";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import decode from "jwt-decode";

const AuthNavbar = ({ logout, isAuth }) => {
  let history = useHistory();
  const userExist = localStorage.getItem("user");
  const dispatch = useDispatch();
  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedRefToken = decode(refreshToken);

      if (decodedRefToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
        return <Redirect to="/login" />;
      }
    }
  }, []);

  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark bg-white fixed-top position-relative"
        expand="md"
      >
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={ooredoo} />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img className="img-fluid" alt="..." src={ooredoo} />
                  </Link>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              {userExist && (
                <>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/offres" tag={Link}>
                      <i className="fab fa-buffer text-red"></i>
                      <span className="nav-link-inner--text text-red">
                        Offres
                      </span>
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">
                        <i className="fas fa-user-circle fa-2x text-red"></i>
                      </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        className="bg-white"
                        to="/profile"
                        tag={Link}
                      >
                        <i className="fas fa-user text-red" />
                        <span>Profile</span>
                      </DropdownItem>

                      <DropdownItem divider />
                      <DropdownItem
                        className="bg-white"
                        onClick={() => {
                          logout(),
                            history.push("/login"),
                            toast.info("Utilisateur déconnecté ");
                        }}
                      >
                        <i className="fas fa-sign-out-alt text-red"></i>
                        <span>Se déconnecter</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              )}

              {!userExist && (
                <>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      to="/published"
                      tag={Link}
                    >
                      <i className="fab fa-buffer text-red"></i>
                      <span className="nav-link-inner--text text-red ">
                        Offres
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      to="/register"
                      tag={Link}
                    >
                      <i className="fas fa-user-plus text-red" />
                      <span className="nav-link-inner--text text-red">
                        Register
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/login" tag={Link}>
                      <i className="fas fa-sign-in-alt text-red"></i>
                      <span className="nav-link-inner--text text-red">
                        Login
                      </span>
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  //user: state.auth.user,
});

export default connect(mapToStateProps, { logout })(AuthNavbar);
