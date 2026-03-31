import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_MOVIE } from '../graphql/Mutation'
import { GET_MOVIES } from '../graphql/Queries'

const MovieForm = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [dateOfReleased, setDateOfReleased] = useState('')
  const [loading, setLoading] = useState(false)

  const [createMovie] = useMutation(CREATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center px-4 pt-24">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="p-6 space-y-6">

          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Add New Movie
          </h1>

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setLoading(true)

              await createMovie({
                variables: {
                  title,
                  description,
                  image,
                  dateOfReleased
                }
              })

              setLoading(false)
              navigate('/home')
            }}
          >
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Movie Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded bg-gray-200 dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-600"
                placeholder="Interstellar"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded bg-gray-200 dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-600 resize-none"
                rows={3}
                placeholder="A team travels through a wormhole to save humanity..."
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded bg-gray-200 dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-600"
                placeholder="https://image.tmdb.org/t/p/w500/..."
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Release Date
              </label>
              <input
                type="date"
                value={dateOfReleased}
                onChange={(e) => setDateOfReleased(e.target.value)}
                className="w-full rounded bg-gray-200 dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-amber-600 py-2.5 font-semibold text-white hover:bg-amber-700 transition disabled:opacity-70"
            >
              {loading ? 'Creating movie...' : 'Create Movie'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default MovieForm
