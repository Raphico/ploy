import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Protect({ children }: {
  children: JSX.Element
}) {
  const { company } = useAuth()

  return company ? children : <Navigate to="/sign-in" />
}

export default Protect
