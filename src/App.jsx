import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

// ✅ Apollo Client correcto
import client from './apollo/client'

// Pages
import Login from './pages/Login'
import Home from './pages/Home'
import SearchedMovies from './pages/SearchedMovies'
import NewMovie from './pages/NewMovie'

// Layout
import NavBar from './layouts/NavBar'

function App () {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <Routes>
          <Route index element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/search/:search' element={<SearchedMovies />} />
          <Route path='/new-movie' element={<NewMovie />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
