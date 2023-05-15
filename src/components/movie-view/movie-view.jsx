// import { MovieCardList } from "../movie-card/movie-card";
import { Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movieList }) => {
  
  const { movieId } = useParams();

  const movie = movieList.find((m) => m.id === movieId);

  // let similarMovies = movies.filter(m => (m.genreName === movie.genreName) && (m.title !== movie.title));


  return (
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
      <Link to={`/`}>
        <button className="btn btn-primary">Back</button>
      </Link>
    </Col>
  );
};