import { Row, Col } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row className="justify-content-center mb-5">
      <Col className="bg-light rounded-3 p-3" xs={10} sm={8} md={6} lg={4} >
        <div className="mb-3">
          <img
            src={movie.image}
            className='w-100'
          />
        </div>
        <div className="mb-1">
          <span className="text-secondary">Title: </span>
          <span className="fw-bold">{movie.title}</span>
        </div>
        <div className="mb-1">
          <span className="text-secondary">Description: </span>
          <span >{movie.description}</span>
        </div>
        <div className="mb-1">
          <span className="text-secondary">Genre: </span>
          <span className="fw-bold">{movie.genreName}</span>
        </div>
        <div className="mb-1">
          <span className="text-secondary">Director: </span>
          <span className="fw-bold">{movie.directorName}</span>
        </div>
        <button className="btn btn-primary" onClick={onBackClick}>Back</button>
      </Col>
    </Row>
  );
};