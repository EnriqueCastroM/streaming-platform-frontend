import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { LOGIN } from '../graphql/Queries'
import userContainer from '../config/UserStore'
import Logo from '../assets/AmazonPrimeVideoLogo.png'

const LoginForm = () => {
  const navigate = useNavigate()
  const addAuthorization = userContainer((state) => state.addAuthorization)

  // ✅ Credenciales demo (mejor UX)
  const [email, setEmail] = useState('admin@admin.com')
  const [password, setPassword] = useState('123456')

  const [invalidCredentials, setInvalidCredentials] = useState(false)
  const [loadingLogin, setLoadingLogin] = useState(false)

  // ✅ Lazy query limpio (sin variables hardcodeadas)
  const [login] = useLazyQuery(LOGIN, {
    fetchPolicy: 'no-cache'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setInvalidCredentials(false)
    setLoadingLogin(true)

    try {
      const { data } = await login({
        variables: { email, password }
      })

      if (data?.login) {
        // ✅ data.login = JWT
        addAuthorization(data.login)
        navigate('/home')
      } else {
        setInvalidCredentials(true)
      }
    } catch (err) {
      console.error('Login error:', err)
      setInvalidCredentials(true)
    } finally {
      setLoadingLogin(false)
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-md">
        {/* LOGO */}
        <div className="mb-8 flex justify-center">
          <img
            src={Logo}
            alt="Amazon Prime Video"
            className="h-14 object-contain"
          />
        </div>

        {/* CARD */}
        <div className="rounded-lg bg-white dark:bg-gray-900 shadow-lg">
          <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Sign in
            </h1>

            {/* DEMO INFO */}
            <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-3 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Demo credentials
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                admin@admin.com / 123456
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded bg-gray-200 dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  placeholder="admin@admin.com"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded bg-gray-200 dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                  placeholder="******"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loadingLogin}
                className="w-full rounded bg-amber-600 py-2.5 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingLogin ? 'Signing in…' : 'Login'}
              </button>

              {invalidCredentials && (
                <p className="text-center text-sm font-semibold text-red-600">
                  Invalid email or password
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
