// src/context/FavoritesContext.jsx
import { createContext, useContext, useMemo } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage" // kita ekstrak hook ke folder hooks

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favs, setFavs] = useLocalStorage("favorites_v1", {})

  const favSet = useMemo(() => new Set(Object.keys(favs)), [favs])

  function toggleFav(m) {
    setFavs(prev => {
      const next = { ...prev }
      if (next[m.imdbID]) delete next[m.imdbID]
      else next[m.imdbID] = m
      return next
    })
  }

  return (
    <FavoritesContext.Provider value={{ favs, favSet, toggleFav }}>
      {children}
    </FavoritesContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  return useContext(FavoritesContext)
}
