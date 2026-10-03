import LikeButton from '../LikeButton/LikeButton';
import './MovieCard.css';

function MovieCard({ film }) {
  const { Title, Year, Poster, Type } = film;

  return (
    <article className="movie-card">
      <button type="button" className="movie-card__poster-button" aria-label={`Открыть страницу ${Type} «${Title}»`}>
        {Poster && Poster !== 'N/A' ? (
          <img
            className="movie-card__poster"
            src={Poster}
            alt={Title}
          />
        ) : (
          <div className="movie-card__poster">
              Постер отсутствует
          </div>
        )}
        <span className="movie-card__type">{Type}</span>
      </button>

      <div className="movie-card__like">
        <LikeButton />
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title" title={Title}>{Title}</h3>
        <p className="movie-card__year">{Year}</p>
      </div>
    </article>
  );
}

export default MovieCard;