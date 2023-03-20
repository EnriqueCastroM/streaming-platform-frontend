// React Router Dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Pages
import Login from './pages/Login'
import Home from './pages/Home'
import SearchedMovies from './pages/SearchedMovies'
import NewMovie from './pages/NewMovie'

// Layouts
import NavBar from './layouts/NavBar'

function App () {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/'
  })
  return (
    <Router>
      <ApolloProvider client={client}>
        <NavBar />
        <Routes>
          <Route index element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/search/:search' element={<SearchedMovies />} />
          <Route path='/new-movie' element={<NewMovie />} />
        </Routes>
      </ApolloProvider>
    </Router>
  )
}

export default App
