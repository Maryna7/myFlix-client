import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // useEffect hook allows React to perform side effects in component e.g fetching data
  useEffect(() => {
    if (!token) return;

    fetch("https://maryna-myflix-app.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            // value names match to API database
            id: doc._id,
            title: doc.Title,
            description: doc.Description,
            image: doc.ImagePath,
            directorName: doc.Director.Name,
            genreName: doc.Genre.Name,
            featured: doc.Featured
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  // Show a login form if the user isn't logged in
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>);
  }

  // Show a selected movie and movies similar in genre below
  if (selectedMovie) {
    let similarMovies = movies.filter(movie => (selectedMovie.genreName === movie.genreName) && (movie != selectedMovie));
    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    // Returning the list of movies and the logout button if the user is logged in
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );

};