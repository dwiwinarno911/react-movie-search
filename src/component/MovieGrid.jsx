import MovieCard from "./MovieCard"
// MovieGrid Component
export default function MovieGrid({ movies, favSet, toggleFav }) {
  return (
    <div className="grid">
      {movies.map((m) => (
        <MovieCard key={m.imdbID} m={m} isFav={favSet.has(m.imdbID)} toggleFav={toggleFav} />
      ))}
    </div>
  )
}