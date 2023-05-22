import { useParams } from "react-router";
import { MovieCardList } from "../movie-card/movie-card"
import "./similar-movie-view.scss";

// The SimilarMovies function component, for displaying similar movies by genre
export const SimilarMovies = ({ movieList, username, token, favoriteMovies, onWishlistUpdate }) => {

  const { movieId } = useParams();

  const movie = movieList.find((m) => m.id === movieId);

  let similarMovies = movieList.filter(m => (movie.genreName === m.genreName) && (movie !== m));

  if (similarMovies.length > 0) {
    return (
      <>
        <h2 className="light-header border-bottom border-2 mb-4 mx-3 px-0 pb-2">Similar Movies</h2>
        <MovieCardList
          movieList={similarMovies}
          username={username}
          token={token}
          favoriteMovies={favoriteMovies}
          onWishlistUpdate={onWishlistUpdate} />
      </>
    );
  }
}