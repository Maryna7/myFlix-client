import { useState, useEffect } from "react";
import { MovieCardList } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { SimilarMovies } from "../similar-movie-view/similar-movie-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);

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
    <BrowserRouter>
      <NavigationBar />
      <Row className="justify-content-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                )}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <SignupView />
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <MovieView movies={movies} />
                    <SimilarMovies movieList={movies} selectedMovie={selectedMovie} />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <div className="text-end">
                      <button className="btn btn-primary mb-3" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                    </div>
                    <MovieCardList movieList={movies} />
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
      {/* <>
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
      </> */}
    </BrowserRouter>
  );
};