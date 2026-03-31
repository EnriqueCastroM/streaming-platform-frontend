import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const userContainer = create(
  persist(
    (set) => ({
      isAuthorized: false,
      token: null,

      addAuthorization: (token) =>
        set({
          isAuthorized: true,
          token
        }),

      logout: () =>
        set({
          isAuthorized: false,
          token: null
        })
    }),
    {
      name: 'auth-storage' // ✅ se guarda en localStorage
    }
  )
)

export default userContainer
