import { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";


// // Creating a Signup Form
export const SignupView = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    birthday: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: values.username,
      Password: values.password,
      ConfirmPassword: values.confirmPassword,
      Email: values.email,
      Birthday: values.birthday
    };

    fetch("https://maryna-myflix-app.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.replace("/login");
      } else {
        alert("Signup failed");
      }
    });
  };

  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value }
    setValues(newObj)
  }

  return (
    <Col md={8} lg={6} xl={5}>
      <Form className="bg-light rounded-3 p-3 mb-5" onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <Form.Group className="mb-3" controlId="SingUpFormUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleInput}
            minLength="3"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="SingUpFormEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="SingUpFormDate">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="SingUpFormPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="SingUpFormPassword2">
          <Form.Label>Confirm password:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            onChange={handleInput}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </Col>
  );
};