// React
import { useState } from 'react'

// React Router Dom
import { useNavigate } from 'react-router-dom'

// Apollo/client
import { useMutation } from '@apollo/client'

// Mutation
import { CREATE_MOVIE } from '../graphql/Mutation'

// Query
import { GET_MOVIES } from '../graphql/Queries'

const MovieForm = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [dateOfReleased, setDateOfReleased] = useState('')

  const [createMovie] = useMutation(CREATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })

  return (
    <section className='flex flex-col items-center justify-center h-screen mt-8'>
      <div className='sm:w-80 md:w-80 lg:w-96 bg-white rounded-lg'>
        <div className='p-6 space-y-6'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
            Create Movie
          </h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await createMovie({ variables: { title, description, image, dateOfReleased } })
              navigate('/home')
            }}
            className='space-y-4 md:space-y-6'
          >
            <div>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                name='title'
                id='title'
                className='bg-gray-200 border border-gray-200 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>
            <div>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Description
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type='text'
                name='description'
                id='description'
                className='bg-gray-200 border border-gray-200 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>
            <div>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Image
              </label>
              <input
                onChange={(e) => setImage(e.target.value)}
                type='text'
                name='image'
                id='image'
                className='bg-gray-200 border border-gray-200 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>
            <div>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Date of released
              </label>
              <input
                onChange={(e) => setDateOfReleased(e.target.value)}
                type='date'
                name='dateOfReleased'
                id='dateOfReleased'
                className='bg-gray-200 border border-gray-200 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full text-white bg-amber-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default MovieForm
