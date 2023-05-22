import PropTypes from "prop-types"; //import the PropTypes library
import { Col, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addToWishList } from "../../helpers";
import { removeFromWishList } from "../../helpers";
import HeartIcon from "../../img/heart-icon.svg";
import HeartIconFull from "../../img/heart-icon-full.svg";
import "./movie-card.scss";

// The MovieCard function component 
export const MovieCardList = ({ movieList, username, token, favoriteMovies, onWishlistUpdate }) => {

  if (!movieList.length) {
    return <div>The list is empty!</div>
  }

  return (
    <>
      {movieList.map((movie) => {

        const isMovieInWishList = favoriteMovies.includes(movie.id); //variable available movies in the wishlist

        //Updating user's favorite movies
        const wishlistUpdate = (user) => {
          onWishlistUpdate(user.FavoriteMovies);
        }

        // Adding the appropriate function to onClick into the button depending on whether the movie is in the wishlist 
        const onClickHandler = isMovieInWishList
          ? () => { removeFromWishList(movie.id, username, token, wishlistUpdate) }
          : () => { addToWishList(movie.id, username, token, wishlistUpdate) };

        // Adding the appropriate icon into the button depending on whether the movie is in the wishlist 
        const wishListIcon = isMovieInWishList ? HeartIconFull : HeartIcon;



        return (
          <Col className="mb-5" key={movie.id} xs={6} md={4} lg={3}>
            <Card className="h-100">
              <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Card.Img variant="top" src={movie.image} />
              </Link>
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genreName}</Card.Text>
                <Row className="justify-content-between">
                  <Col xs={6} className="align-self-center">
                    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                      <button className="btn btn-primary" variant="link">Open</button>
                    </Link>
                  </Col>
                  <Col xs={4} className="text-end align-self-center">
                    <button className="btn heart-button" onClick={onClickHandler}>
                      <img className="w-100 heart-img" src={wishListIcon} alt="Icon of a heart" />
                    </button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>);
      })}
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
  })).isRequired
};