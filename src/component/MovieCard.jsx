// MovieCard Component
export default function MovieCard({ m, isFav, toggleFav }) {
  return (
    <article className="card" key={m.imdbID} aria-label={`${m.Title} (${m.Year})`}>
      <img
        src={m.Poster && m.Poster !== 'N/A' ? m.Poster : `https://via.placeholder.com/300x450?text=${encodeURIComponent(m.Title)}`}
        alt={`${m.Title} poster`}
        loading="lazy"
      />
      <div className="card-body">
        <h3 title={m.Title}>{m.Title}</h3>
        <p className="year">{m.Year}</p>
        <button
          className={isFav ? 'btn danger' : 'btn'}
          onClick={() => toggleFav(m)}
          aria-pressed={isFav}
        >
          {isFav ? '★ Remove' : '☆ Favorite'}
        </button>
      </div>
    </article>
  )
}