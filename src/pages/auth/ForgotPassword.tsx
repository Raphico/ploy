import { sendPasswordResetEmail } from "firebase/auth"
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner/Spinner"
import { auth } from "../../config/firebase"
import "./styles.css"

function ForgotPassword() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState("")

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/sign-in")
        toast.success("Password reset email sent", {
          position: "top-center"
        })
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message, {
          position: "top-center"
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="auth flow">
      <h1 className="fs-500 fw-bold text-center">
        Reset Password
      </h1>

      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email" 
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input bg-light"
        />

        <input 
          type="submit" 
          value="Send password reset email"
          className="btn bg-accent text-primary fw-bold"
        />
      </form>

      <div className="text-center">
        <p>
          Want a new account? <Link to="/sign-up" className="text-accent fw-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
