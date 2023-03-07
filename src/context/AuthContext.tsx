import { createContext, useContext, useEffect, useReducer } from "react"
import AuthReducer, { Action } from "./AuthReducer"

export type Company = {
  uid: string,
  displayName: string | null,
  email: string | null,
  emailVerified: boolean | null
}

export type State = {
  company: Company | null,
  dispatch: React.Dispatch<Action>
}

const company = JSON.parse(localStorage.getItem("company") || "null")

const initialState: State = {
  company: company,
  dispatch: () => {}
}

const AuthContext = createContext(initialState)

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  useEffect(() => {
    localStorage.setItem("company", JSON.stringify(state.company))
  }, [state.company])

  return (
    <AuthContext.Provider value={{
      company: state.company,
      dispatch
    }}>
      { children }
    </AuthContext.Provider>
  )
}
