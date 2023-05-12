import PropTypes from "prop-types"; //import the PropTypes library
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// The MovieCard function component 
export const MovieCardList = ({ movieList }) => {
  if (!movieList.length) {
    return <div>The list is empty!</div>
  }
  return (
    <>
      {movieList.map((movie) => (
        <Col className="mb-5" key={movie.id} xs={6} md={4} lg={3}>
          <Card className="h-100">
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Card.Img variant="top" src={movie.image} />
            </Link>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.genreName}</Card.Text>
              <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <button className="btn btn-primary" variant="link">
                  Open
                </button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
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