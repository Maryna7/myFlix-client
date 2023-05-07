export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img
          style={{
            maxWidth: '200px'
          }}
          src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genreName}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.directorName}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};