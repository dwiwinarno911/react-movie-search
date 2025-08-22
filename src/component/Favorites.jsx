// FavoritesSection Component
export default function Favorites({ favs, toggleFav }) {
  const favList = Object.values(favs)
  return (
     <div className="app">
        <header className="header">
        <h1>🎬 My Favorites</h1>
        </header>
        <section className="favorites">
            <h2>★ Favorites</h2>
            <div className="grid">
                {favList.length === 0 && <p className="muted">No favorites yet.</p>}
                {favList.map((m) => (
                <article className="card" key={`fav-${m.imdbID}`}>
                    <img
                    src={m.Poster && m.Poster !== 'N/A' ? m.Poster : `https://via.placeholder.com/300x450?text=${encodeURIComponent(m.Title)}`}
                    alt={`${m.Title} poster`}
                    loading="lazy"
                    />
                    <div className="card-body">
                    <h3 title={m.Title}>{m.Title}</h3>
                    <p className="year">{m.Year}</p>
                    <button className="btn danger" onClick={() => toggleFav(m)}>★ Remove</button>
                    </div>
                </article>
                ))}
            </div>
        </section>
    </div>
    
  )
}
