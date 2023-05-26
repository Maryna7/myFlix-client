import { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { MovieCardList } from "../movie-card/movie-card";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";

export const ProfileView = ({
  user,
  token,
  movieList,
  onLoggedOut,
  userFavoriteMoviesId,
  onWishlistUpdate,
  onUserInfoUpdate }) => {

  const [isOpen, setOpen] = useState(false);

  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    birthday: '',
  });

  const handleShowEditProfile = () => {
    setOpen(!isOpen)
  }

  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value }
    setValues(newObj)
  }

  const favoriteMovies = movieList.filter(m => userFavoriteMoviesId.includes(m.id));

  const birthdayInfo = user.Birthday ? new Date(user.Birthday).toLocaleDateString('de') : '';

  //Updating user's favorite movies
  const userInfoUpdate = (user) => {
    onUserInfoUpdate(user);
  }

  // The function component for updating a user data
  const handleUserUpdateSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: values.username,
      Password: values.password,
      ConfirmPassword: values.confirmPassword,
      Email: values.email,
      Birthday: values.birthday
    };

    fetch(`https://maryna-myflix-app.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Changing userdata failed");
        return false;
      }
    }).then(user => {
      if (user) {
        alert("Successfully changed userdata");
        userInfoUpdate(user)
      }
    })
      .catch(e => {
        alert(e);
      });;
  };

  // The function component for deleting a user account
  const deleteAccount = () => {
    fetch(`https://maryna-myflix-app.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (response.ok) {
        alert("Your account has been deleted.");
        onLoggedOut();
      } else {
        alert("Could not delete your account");
      }
    })
      .catch((e) => {
        alert("Something went wrong");
      });
  }

  return (
    <Row className="justify-content-center">
      <div className="bg-light rounded-3 p-3">

        <UserInfo username={user.Username} email={user.Email} birthday={birthdayInfo}
          onButtonClick={handleShowEditProfile} />

        {/* Updating a user info form */}
        {isOpen ? (
          < UpdateUser
            handleInput={handleInput}
            handleUserUpdateSubmit={handleUserUpdateSubmit}
            deleteAccount={deleteAccount}
          />
        ) : null}


        {/* Showing a list of user's favorite movies */}
        <Row>
          <h3>My favorite movies:</h3>
          <MovieCardList
            movieList={favoriteMovies}
            username={user.Username}
            token={token}
            favoriteMovies={userFavoriteMoviesId}
            onWishlistUpdate={onWishlistUpdate}
          />
        </Row>
      </div >
    </Row >
  );
};