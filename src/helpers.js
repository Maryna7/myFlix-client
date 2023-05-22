// The function component for adding a movie to wish list
export const addToWishList = (movieID, username, token, callBack) => {
  fetch(`https://maryna-myflix-app.herokuapp.com/users/${username}/movies/${movieID}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Adding the movie failed");
      return false;
    }
  }).then(user => {
    if (user) {
      callBack(user)
      alert("The movie successfully added to your favorites");
    }
  })
    .catch(e => {
      alert(e);
    });
};



// The function component for removing a movie from wish list
export const removeFromWishList = (movieID, username, token, callBack) => {
  fetch(`https://maryna-myflix-app.herokuapp.com/users/${username}/movies/${movieID}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Removing the movie failed");
      return false;
    }
  }).then(user => {
    if (user) {
      callBack(user)
      alert("The movie successfully removed from your favorites");
    }
  })
    .catch(e => {
      alert(e);
    });
};