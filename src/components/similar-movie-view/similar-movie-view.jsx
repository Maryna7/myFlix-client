import { Col, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// The SimilarMovies function component, for displaying similar movies by genre
export const SimilarMovies = ({ movieList }) => {

  const { movieId } = useParams();

  const movie = movieList.find((m) => m.id === movieId);

  let similarMovies = movieList.filter(m => (movie.genreName === m.genreName) && (movie !== m));

  if (similarMovies.length > 0) {
    return (
      <>
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
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
  }
}