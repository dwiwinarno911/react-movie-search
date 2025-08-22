import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDebounced } from "./hooks/useDebounced"
import { useFavorites, FavoritesProvider } from "./context/FavoritesContext"
import Header from "./component/Header"
import StatusBar from "./component/StatusBar"
import MovieGrid from "./component/MovieGrid"
import FavoritesSection from "./component/FavoritesSection"
import Favorites from "./component/Favorites"

// ===== Panggil OMDB Dsini =====
const API_URL = 'https://www.omdbapi.com/'
async function fetchMovies(query, signal) {
  const key = import.meta.env.VITE_OMDB_API_KEY
  if (!key) throw new Error('Missing VITE_OMDB_API_KEY in .env')
  if (!query) return []
  const url = `${API_URL}?apikey=${key}&s=${encodeURIComponent(query)}&type=movie`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error('Network error')
  const data = await res.json()
  if (data.Response === 'False') throw new Error(data.Error || 'No results')
  return data.Search || []
}

/*
  Jadi, fungsi fetchMovies di bawah ini tugasnya buat cari film dari OMDB API.
  Cara kerjanya: butuh query (kata kunci film) sama signal buat cancel request kalau perlu.
  Pertama dicek dulu, API key udah ada belum di .env. Kalau belum, error.
  Kalau query-nya kosong, langsung balikin array kosong.
  Terus, dia bikin URL buat request ke OMDB, terus fetch datanya.
  Kalau responsenya oke, dia ambil hasil pencarian filmnya.
  Kalau ada error, misal jaringan atau film nggak ketemu, dia bakal lempar error juga.
*/
function MovieApp() {
  const [query, setQuery] = useState('naruto')
  const debounced = useDebounced(query, 600)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { favs, favSet, toggleFav } = useFavorites()

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    fetchMovies(debounced, controller.signal)
      .then(setMovies)
      .catch(err => {
        setMovies([])
        setError(err.message || 'Error')
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [debounced])

  return (
    <div className="app">
      <Header query={query} setQuery={setQuery} />
      <StatusBar loading={loading} error={error} debounced={debounced} movies={movies} />
      <MovieGrid movies={movies} favSet={favSet} toggleFav={toggleFav} />
      <FavoritesSection favs={favs} toggleFav={toggleFav} />
    </div>
  )
}

function FavoritesPage() {
  const { favs, toggleFav } = useFavorites()
  return (
    <Favorites favs={favs} toggleFav={toggleFav} />
  );
}


export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <nav className="navbar">
          <a href="/" className="nav-link">Home</a>
          <a href="/favorites" className="nav-link">Favorites</a>
        </nav>
        <Routes>
          <Route path="/" element={<MovieApp />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
