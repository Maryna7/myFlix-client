import { useState, useEffect } from "react";
import { MovieCardList } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { SimilarMovies } from "../similar-movie-view/similar-movie-view";

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

  return (
    <>
      {!user ? (
        <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <SignupView />
        </>
      ) : selectedMovie ? (
        <>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          <SimilarMovies movieList={movies} selectedMovie={selectedMovie} onSelectedMovie={setSelectedMovie} />
        </>
      ) : (
        <>
          <div className="text-end">
            <button className="btn btn-primary mb-3" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
          </div>
          <MovieCardList movieList={movies} onSelectedMovie={setSelectedMovie} />
        </>
      )
      }
    </>
  );
};