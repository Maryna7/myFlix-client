import PropTypes from "prop-types"; //import the PropTypes library
import { Row, Col, Card } from "react-bootstrap";

// The MovieCard function component 
export const MovieCardList = ({ movieList, onSelectedMovie }) => {
  if (!movieList.length) {
    return <div>The list is empty!</div>
  }
  return (
    <Row>
      {movieList.map((movie) => (
        <Col className="mb-5" key={movie.id} xs={6} md={4} lg={3}>
          <Card className="h-100" onClick={() => onSelectedMovie(movie)}>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.genreName}</Card.Text>
              <button className="btn btn-primary" onClick={() => onSelectedMovie(movie)} variant="link">
                Open
              </button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCardList.propTypes = {
  movieList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    directorName: PropTypes.string,
    genreName: PropTypes.string
  })).isRequired,
  onSelectedMovie: PropTypes.func.isRequired
};