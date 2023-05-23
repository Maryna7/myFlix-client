import { Row, Col, Form, Button } from "react-bootstrap";

export const UpdateUser = ({ handleUserUpdateSubmit, handleInput, deleteAccount }) => {
  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6} xl={5} className="rounded-3 border mb-4">
        <Form className="bg-light rounded-3 p-3" onSubmit={handleUserUpdateSubmit}>
          <h2>Update my profile</h2>
          <Form.Group className="mb-3" controlId="UpdateFormUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleInput}
              minLength="3"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="UpdateFormEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="UpdateFormDate">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="UpdateFormPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="UpdateFormPassword2">
            <Form.Label>Confirm password:</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Row className="justify-content-center">
            <Col xs={12} sm={6}>
              <Button className="w-100" variant="primary" type="submit" >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="mb-3">
          <button className="btn btn-link" variant="primary" onClick={() => {
            if (confirm("Are you sure?")) {
              deleteAccount();
            }
          }}>Delete my account</button>
        </Row>
      </Col>
    </Row>
  )
}