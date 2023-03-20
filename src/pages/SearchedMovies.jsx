// React
import { useEffect } from 'react'

// React Router Dom
import { useNavigate } from 'react-router-dom'

// Components
import MovieCard from '../components/MovieCard'
import NotFound from '../components/NotFound'

// Zustand
import searchedMoviesContainer from '../config/SearchedMovies'
import userContainer from '../config/UserStore'

const SearchedMovies = () => {
  const navigate = useNavigate()
  const searchedMovies = searchedMoviesContainer((state) => state.searchedMovies.searchedMovies)
  const getAuthorization = userContainer((state) => state.isAuthorized)
  const isAuthorized = getAuthorization.isAuthorized

  useEffect(() => {
    if (isAuthorized !== true) {
      return navigate('/')
    }
  }, [])

  return (
    <div className='flex justify-center flex-wrap gap-y-5 xs:gap-y-7 sm:gap-y-5 gap-x-6 2xl:gap-x-4 mb-8 mt-40 2xl:mt-44 xs:pt-2 sm:pt-5 md:pt-4 lg:pt-6 xl:pt-5 2xl:pt-2 xl:px-6 2xl:px-0'>
      {
      searchedMovies?.length > 0
        ? searchedMovies.map((data) => (
          <MovieCard key={data._id} data={data} />
        ))
        : <NotFound />
    }
    </div>
  )
}

export default SearchedMovies
