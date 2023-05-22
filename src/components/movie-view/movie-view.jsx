// import { MovieCardList } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { addToWishList } from "../../helpers";
import { removeFromWishList } from "../../helpers";
import HeartIcon from "../../img/heart-icon.svg";
import HeartIconFull from "../../img/heart-icon-full.svg";
import "../movie-card/movie-card.scss";

export const MovieView = ({ movieList, username, token, favoriteMovies, onWishlistUpdate }) => {

  const { movieId } = useParams();

  const movie = movieList.find((m) => m.id === movieId);

  const isMovieInWishList = favoriteMovies.includes(movieId); //variable available movies in the wishlist

  //Updating user's favorite movies
  const wishlistUpdate = (user) => {
    onWishlistUpdate(user.FavoriteMovies);
  }

  // Adding the appropriate function to onClick into the button depending on whether the movie is in the wishlist 
  const onClickHandler = isMovieInWishList
    ? () => { removeFromWishList(movieId, username, token, wishlistUpdate) }
    : () => { addToWishList(movieId, username, token, wishlistUpdate) };

  // Adding the appropriate icon into the button depending on whether the movie is in the wishlist 
  const wishListIcon = isMovieInWishList ? HeartIconFull : HeartIcon;

  return (
    <Col className="bg-light rounded-3 p-3 mb-5" xs={10} sm={8} md={6} lg={4} >
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

      <Row className="justify-content-between align-self-center">
        <Col xs={6} className="align-self-center">
          <Link to={"/"}>
            <button className="btn btn-primary" variant="primary">Back</button>
          </Link>
        </Col>
        <Col xs={3} className="text-end align-self-center">
          <button className="btn heart-button" onClick={onClickHandler}>
            <img className="w-100 heart-img" src={wishListIcon} alt="Icon of a heart" />
          </button>
        </Col>
      </Row>
    </Col>
  );
};