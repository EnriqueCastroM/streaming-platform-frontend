import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

// Zustand
import userContainer from '../config/UserStore'
import searchedMoviesContainer from '../config/SearchedMovies'

// Apollo
import { useLazyQuery } from '@apollo/client'
import { GET_MOVIES } from '../graphql/Queries'

// Styles
import './NavBar.css'

// Logo
import Logo from '../assets/AmazonPrimeVideoLogo.png'

const NavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

  const [searchedValue, setSearchedValue] = useState('')

  const logout = userContainer((state) => state.logout)
  const addSearchedMovies = searchedMoviesContainer((state) => state.addSearchedMovies)

  const [getMovies] = useLazyQuery(GET_MOVIES)

  // ✅ Ocultar navbar en login
  if (pathname === '/') return null

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/80 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4 lg:px-12">

        {/* LOGO */}
        <Link to="/home" onClick={() => setSearchedValue('')}>
          <img src={Logo} className="h-8 md:h-10" alt="Amazon Prime Video" />
        </Link>

        {/* SEARCH */}
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const { data } = await getMovies()
            const filtered = data.getMovies.filter((movie) =>
              movie.title.toLowerCase().includes(searchedValue.toLowerCase())
            )
            addSearchedMovies({ data: filtered })
            navigate(`/search/${searchedValue}`)
          }}
          className="hidden md:flex items-center gap-2"
        >
          <input
            type="text"
            value={searchedValue}
            onChange={(e) => setSearchedValue(e.target.value)}
            placeholder="Search movie..."
            className="rounded-md bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none"
            required
          />
          <button className="rounded-md bg-sky-700 px-3 py-2 text-white hover:bg-sky-600">
            Search
          </button>
        </form>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <Link
            to="/new-movie"
            className="text-sm font-semibold text-white hover:text-amber-400"
          >
            + New Movie
          </Link>

          <button
            onClick={() => {
              logout()
              navigate('/', { replace: true })
            }}
            className="rounded-md border border-white px-3 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar