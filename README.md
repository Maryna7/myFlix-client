# myFlix-client

## Project description

It is the client-side for an app called myFlix based on its existing server-side code. In this app a user has the opportunity to get information about movies, about the details of a movie, about movie's director, information about movie's genre. Also, the user has the opportunity to create an account and save favorite movies to the list of favorite movies.


## How to get the project running

Download source code and open `index.html` in your browser.


## Project dependencies 

HTML, SCSS, React, Bootstrap, Parcel, React Redux.


## Techstack

- Single-page application (SPA)
- State routing to navigate between views and share URLs
- Parcel as its build tool
- React library and in ES2015+
- Bootstrap as a UI library for styling and responsiveness
- React Redux for state management


## Essential Views & Features:

**Main view**
- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

**Single Movie view**
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

**Login view**
- Allows users to log in with a username and password

**Signup view**
- Allows new users to register (username, password, email, date of birth)

**Profile view**
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister