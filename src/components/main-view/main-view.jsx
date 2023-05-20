import { useState, useEffect } from "react";
import { MovieCardList } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
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
  const [favoriteMoviesId, setFavoriteMoviesId] = useState([]);

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
      <NavigationBar user={user} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
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
                      setFavoriteMoviesId(user.FavoriteMovies);
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
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  token={token}
                  movieList={movies}
                  userFavoriteMoviesId={favoriteMoviesId}
                  onWishlistUpdate={setFavoriteMoviesId}
                  onLoggedOut={() => {
                    setUser(null); setToken(null); localStorage.clear();
                  }}
                  onUserInfoUpdate={setUser} />
              )
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
                    <MovieView
                      movieList={movies}
                      username={user.Username}
                      token={token}
                      favoriteMovies={favoriteMoviesId}
                      onWishlistUpdate={setFavoriteMoviesId}
                    />
                    <SimilarMovies
                      movieList={movies}
                      username={user.Username}
                      token={token}
                      favoriteMovies={favoriteMoviesId}
                      onWishlistUpdate={setFavoriteMoviesId} />
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
                  <MovieCardList
                    movieList={movies}
                    username={user.Username}
                    token={token}
                    favoriteMovies={favoriteMoviesId}
                    onWishlistUpdate={setFavoriteMoviesId}
                  />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};