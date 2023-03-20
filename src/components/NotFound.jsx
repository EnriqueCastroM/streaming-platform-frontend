// React Router Dom
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div
      className='flex items-center justify-center'
    >
      <div className='px-32 py-10 rounded-md'>
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-white text-9xl'>404</h1>
          <h6 className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
            <span className='text-sky-500 mr-2'>Oops!</span>
            <span className='text-white'>Page not found</span>
          </h6>
          <p className='mb-5 text-center text-gray-200 md:text-lg'>
            There are no results for your search
          </p>
          <Link
            to='/home'
            className='px-6 py-2 text-md font-semibold text-white bg-sky-600'
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
