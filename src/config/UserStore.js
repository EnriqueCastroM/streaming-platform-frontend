import { create } from 'zustand'

const userContainer = create((set) => ({
  isAuthorized: { token: false },
  addAuthorization: (key) =>
    set((state) => ({
      isAuthorized: { ...state.token, isAuthorized: true }
    })),
  removeAuthorization: () =>
    set((state) => ({
      isAuthorized: { ...state.token, isAuthorized: false }
    }))
}))

export default userContainer
