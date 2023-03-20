// React
import { useEffect } from 'react'

// React Router Dom
import { useNavigate } from 'react-router-dom'

// Zustand
import userContainer from '../config/UserStore'

// Apollo/client
import { useLazyQuery } from '@apollo/client'

// Queries
import { GET_MOVIES } from '../graphql/Queries'

// Components
import MovieCard from '../components/MovieCard'

const Home = () => {
  const navigate = useNavigate()
  const getAuthorization = userContainer((state) => state.isAuthorized)
  const isAuthorized = getAuthorization.isAuthorized

  // eslint-disable-next-line no-unused-vars
  const [getMovies, { data, error }] = useLazyQuery(GET_MOVIES)

  useEffect(() => {
    if (isAuthorized !== true) {
      return navigate('/')
    } else { getMovies() }
  }, [])

  return (
    <div className='flex justify-center flex-wrap gap-y-5 xs:gap-y-7 sm:gap-y-5 gap-x-6 2xl:gap-x-4 mb-8 mt-40 2xl:mt-44 xs:pt-2 sm:pt-5 md:pt-4 lg:pt-6 xl:pt-5 2xl:pt-2 xl:px-6 2xl:px-0'>
      {
        data &&
          data.getMovies.map((data) => (
            <MovieCard key={data._id} data={data} />
          ))
      }
    </div>
  )
}

export default Home
