import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png"
import "./navigation.scss";
import { useState } from "react";

export const NavigationBar = ({ user, onLoggedOut, onNavSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSeachSubmit = (event) => {
    event.preventDefault();
    onNavSearch(inputValue);
  };


  return (
    <Navbar collapseOnSelect className="mb-4" bg="light" expand="lg" >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="My Flix logo" className="header-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!user && (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </Nav>
          )}
          {user && (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={handleSeachSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  type="submit"
                >Search</Button>
              </Form>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};