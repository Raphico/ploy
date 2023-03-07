import { signInWithEmailAndPassword } from "firebase/auth"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AuthWith from "../../components/auth/AuthWith"
import AuthWithGoogle from "../../components/auth/AuthWithGoogle"
import Spinner from "../../components/Spinner/Spinner"
import { auth } from "../../config/firebase"
import { useAuth } from "../../context/AuthContext"
import "./styles.css"

function SignIn() {
  const navigate = useNavigate()
  const { dispatch } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const {email, password} = formData

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target

    setFormData(oldFormData => ({
      ...oldFormData,
      [target.name]: target.value
    }))
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
      .catch((error) => {
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
    <div className="auth flow">
      <h1 className="fs-500 fw-bold text-center">
        Sign In to Ploy
      </h1>

      <AuthWith msg="Sign in with Email" />

      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email" 
          placeholder="example@mail.com"
          value={email}
          onChange={onChange}
          className="form-input bg-light"
          required
        />

        <label htmlFor="password">Password</label>
        <input 
          id="password"
          name="password"
          type="password" 
          autoComplete="off"
          value={password}
          onChange={onChange}
          className="form-input bg-light"
          required
        />

        <div className="text-right">
          <Link to="/forgot-password" className="text-accent fw-bold">
            Forgot password?
          </Link>
        </div>

        <input 
          type="submit" 
          value="Sign in"
          className="btn bg-accent text-primary fw-bold"
        />
      </form>

      <AuthWith msg="Or" />
      <AuthWithGoogle type="in" />

      <div className="text-center">
        <p>
          Don't have an account? <Link to="/sign-up" className="text-accent fw-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
