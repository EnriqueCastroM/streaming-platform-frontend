// React
import { useEffect } from 'react'

// React Router Dom
import { useNavigate } from 'react-router-dom'

// Zustand
import userContainer from '../config/UserStore'

// Components
import MovieForm from '../components/MovieForm'

const NewMovie = () => {
  const navigate = useNavigate()

  const getAuthorization = userContainer((state) => state.isAuthorized)
  const isAuthorized = getAuthorization.isAuthorized

  useEffect(() => {
    if (isAuthorized !== true) {
      return navigate('/')
    }
  }, [])

  return (
    <>
      <MovieForm />
    </>
  )
}

export default NewMovie
