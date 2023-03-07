import { 
  BrowserRouter as Router,
  Routes,
  Route
 } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import Employee from "./pages/Employee/Employee"
import Employees from "./pages/Employees/Employees"
import ForgotPassword from "./pages/auth/ForgotPassword"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employee/:id" element={<Employee />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
