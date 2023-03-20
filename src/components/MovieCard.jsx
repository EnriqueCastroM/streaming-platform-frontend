// React
import { useEffect, useState } from 'react'

// Apollo/client
import { useMutation } from '@apollo/client'

// Query
import { GET_MOVIES } from '../graphql/Queries'

// Mutation
import { UPDATE_MOVIE } from '../graphql/Mutation'

const MovieCard = ({ data }) => {
  const [_id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [likes, setLikes] = useState('')
  const [image, setImage] = useState('')
  const [dateOfReleased, setDateOfReleased] = useState('')

  const [isLikeUpdated, setIsLikeUpdated] = useState(false)

  useEffect(() => {
    setId(data._id)
    setTitle(data.title)
    setDescription(data.description)
    setLikes(data.likes)
    setImage(data.image)
    setDateOfReleased(new Date(data.dateOfReleased).toLocaleDateString())
  }, [])

  // Mutation Update Movie
  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })

  return (
    <div className='max-w-sm shadow'>
      <div className='group relative bg-black rounded-md h-46 xs:h-48 2xl:h-48'>
        <img
          alt={title}
          src={image}
          className='absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-md'
        />
        <div className='relative p-4'>
          <p className='text-sm 2xl:text-sm font-bold uppercase -tracking-normal text-cyan-600'>
            Movie
          </p>
          <p className='text-lg 2xl:text-xl font-bold text-white'>{title}</p>
          <div className='flex justify-start space-x-4 translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 mt-2'>
            <p className='text-sm 2xl:text-base font-medium text-white'>
              {dateOfReleased}
            </p>
            <div className='flex space-x-1'>
              <p className='text-sm 2xl:text-base font-medium text-white'>{likes}</p>
              <svg
                onClick={async (e) => {
                  if (isLikeUpdated) {
                    setLikes(likes - 1)
                    await updateMovie({ variables: { _id, likes: likes - 1 } })
                    setIsLikeUpdated(false)
                  } else {
                    setLikes(likes + 1)
                    await updateMovie({ variables: { _id, likes: likes + 1 } })
                    setIsLikeUpdated(true)
                  }
                }}
                className={
                  isLikeUpdated
                    ? 'text-white pt-1 w-5 h-6 2xl:w-6 2xl:h-7 hover:text-red-500 rotate-180'
                    : 'text-white pb-1 w-5 h-6 2xl:w-6 2xl:h-7 hover:text-yellow-400'
                }
                viewBox='0 0 26 27'
                stroke='currentColor'
                fill='none'
              >
                <path stroke='none' d='M0 0h24v24H0z' />
                <path d='M7 11v 8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3' />
              </svg>
            </div>
          </div>
          <div className='w-80 h-18 pt-2'>
            <div className='translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100'>
              <p className='text-sm text-white'>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
