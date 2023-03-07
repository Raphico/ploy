import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AuthWith from "../../components/auth/AuthWith"
import { useAuth } from "../../context/AuthContext"
import "./styles.css"
import { auth } from "../../config/firebase"
import Spinner from "../../components/Spinner/Spinner"
import { createUserWithEmailAndPassword } from "firebase/auth"
import AuthWithGoogle from "../../components/auth/AuthWithGoogle"

function SignUp() {
  const navigate = useNavigate()
  const { dispatch } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const {email, password, confirmPassword} = formData

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target

    setFormData(oldFormData => ({
      ...oldFormData,
      [target.name]: target.value
    }))
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmPassword !== password) {
      toast.error("Passwords don't match", {
        position: "top-center"
      })
      return
    }

    setIsLoading(true)
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = {
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          emailVerified: userCredential.user.emailVerified
        }
        dispatch({
          type: "SIGN_UP",
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
        Sign Up to Ploy
      </h1>

      <AuthWith msg="Sign up with Email" />

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

        <label htmlFor="confirmPassword">confirm password</label>
        <input 
          id="confirmPassword"
          name="confirmPassword"
          type="password" 
          autoComplete="off"
          value={confirmPassword}
          onChange={onChange}
          className="form-input bg-light"
          required
        />

        <input 
          type="submit" 
          value="Sign Up"
          className="btn bg-accent text-primary fw-bold"
        />
      </form>

      <AuthWith msg="Or" />
      <AuthWithGoogle type="up" />

      <div className="text-center">
        <p>
          Don't have an account? <Link to="/sign-in" className="text-accent fw-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
