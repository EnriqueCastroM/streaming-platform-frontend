import { create } from 'zustand'

const searchedMoviesContainer = create((set) => ({
  searchedMovies: { data: '' },
  addSearchedMovies: (key) =>
    set((state) => ({
      searchedMovies: { ...state.data, searchedMovies: key.data }
    }))
}))

export default searchedMoviesContainer
