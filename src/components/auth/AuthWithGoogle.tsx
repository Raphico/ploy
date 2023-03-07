import { signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { auth, googleProvider } from "../../config/firebase"
import { useAuth } from "../../context/AuthContext"
import Spinner from "../Spinner/Spinner"
import "./styles.css"

type Props = {
  type: string
}

function AuthWithGoogle({ type }: Props) {
  const navigate = useNavigate()
  const { dispatch } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  function handleAuth() {
    setIsLoading(true)

    signInWithPopup(auth, googleProvider)
      .then(userCredential => {
        const user = {
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          emailVerified: userCredential.user.emailVerified
        }
        dispatch({
          type: "SIGN_IN",
          payload: user
        })
      })
      .then(() => navigate("/"))
      .catch(error => {
        console.log(error.message)
        toast.error(error.message, {
          position: "top-center"
        })
      })
      .finally(() => setIsLoading(false))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <button 
        onClick={handleAuth}
        className="sign-in-with-google | btn fw-bold flex"
      >
        <FcGoogle size={25} />
        Sign { type } with Google
      </button>
    </div>
  )
}

export default AuthWithGoogle
