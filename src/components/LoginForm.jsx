// React
import { useState } from 'react'

// React Router Dom
import { useNavigate } from 'react-router-dom'

// Query and Apollo Client
import { LOGIN } from '../graphql/Queries'
import { useLazyQuery } from '@apollo/client/react'

// Zustand
import userContainer from '../config/UserStore.js'

// Assets
import Logo from '../assets/AmazonPrimeVideoLogo.png'

const LoginForm = () => {
  const navigate = useNavigate()
  const addAuthorization = userContainer((state) => state.addAuthorization)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalidCredentials, setInvalidCredentials] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [login, { data, error }] = useLazyQuery(LOGIN, {
    variables: { email, password }
  })

  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className='flex items-center mb-10'>
        <img className='w-full h-10 sm:h-14' src={Logo} alt='logo' />
      </div>
      <div className='sm:w-80 md:w-80 lg:w-96 bg-white rounded-lg'>
        <div className='p-6 space-y-6'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
            Sign-in
          </h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault()

              // Excecute login Query
              await login().then(function (response) {
                if (response.data.login === 'Ok User') {
                  addAuthorization()
                  navigate('/home')
                } else {
                  setInvalidCredentials(true)
                }
              })
            }}
            className='space-y-4 md:space-y-6'
          >
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                E-mail
              </label>
              <input
                type='email'
                name='email'
                id='email'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className='bg-gray-200 border border-gray-200 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className='bg-gray-200 border border-gray-200 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full text-white bg-amber-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              Login
            </button>
            {invalidCredentials && (
              <h1 className='text-base font-semibold leading-tight text-red-600 text-center'>
                Invalid Credentials!
              </h1>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
