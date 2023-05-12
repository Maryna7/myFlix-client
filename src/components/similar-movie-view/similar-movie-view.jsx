import { Row, Col, Card } from "react-bootstrap";



// The SimilarMovies function component, for displaying similar movies by genre
export const SimilarMovies = ({ movieList, selectedMovie, onSelectedMovie }) => {

  let similarMovies = movieList.filter(movie => (selectedMovie.genreName === movie.genreName) && (movie !== selectedMovie));

  if (similarMovies.length > 0) {
    return (
      <Row>
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <Col className="mb-5" key={movie.id} sm={6} md={4} lg={3}>
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
  }
}