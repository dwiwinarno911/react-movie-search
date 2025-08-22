// StatusBar Component
export default function StatusBar({ loading, error, debounced, movies }) {
  return (
    <div className="bar">
      {loading && <span className="muted">Loading…</span>}
      {error && <span className="error" role="alert">{error}</span>}
      {!loading && !error && (
        <span className="muted">
          {debounced ? (movies.length ? `${movies.length} results` : 'No results') : 'Type to search…'}
        </span>
      )}
    </div>
  )
}
