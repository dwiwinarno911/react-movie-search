// Header Component
export default function Header({ query, setQuery }) {
  return (
    <header className="header">
      <h1>🎬 D&W Movie Search</h1>
      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies… e.g., Naruto"
        aria-label="Search movies"
      />
    </header>
  )
}