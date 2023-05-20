import { Row, Col, Card } from "react-bootstrap";

export const UserInfo = ({ username, email, birthday, onButtonClick }) => {
  return (
    <Card className="mb-5">
      <Card.Body>
        <Card.Title >My profile:</Card.Title>
        <Row>
          <Col lg={3}>Username: {username}</Col>
          <Col lg={3}>Email: {email}</Col>
          <Col lg={3}>Birthday: {birthday}</Col>
        </Row>
        <div className="text-end">
          <button className="btn btn-primary" variant="link" onClick = {onButtonClick}>Update my profile</button>
        </div>
      </Card.Body>
    </Card>
  )
}