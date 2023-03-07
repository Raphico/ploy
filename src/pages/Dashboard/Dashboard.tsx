import { signOut } from "firebase/auth"
import { auth } from "../../config/firebase"
import { useAuth } from "../../context/AuthContext"
import Protect from "../../utils/protect"
import "./styles.css"
import { IoMdSettings } from "react-icons/io"

function Dashboard() {
  const { company, dispatch } = useAuth()
  const companyName = company?.displayName
  const heading = companyName ? `${companyName}'s Company` : 'Welcome'

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SIGN_OUT",
          payload: null
        })
      })
  }

  return (
    <Protect>
      <div>
        <div className="header flex">
          <h1 className="fs-500 fw-bold">
            {heading}
          </h1>

          <div className="flex">
            <IoMdSettings 
              color="#333"
              size={30}
            />

            <button 
              onClick={handleSignOut}
              className="btn bg-accent text-primary fw-bold"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </Protect>
  )
}

export default Dashboard
