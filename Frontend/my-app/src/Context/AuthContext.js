import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ToastContext from "./ToastContext";
// import axios from "react-dom"
const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  useEffect(() => {
    checkUserLoggedIn()
  }, [])
  // const [error, setError] = useState(null)
  //check if the user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch("https://be-10x-cms.herokuapp.com/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      const result = await res.json()
      if (!result.error) {
        if (location.pathname === "/login" || location.pathname === "/register") {
          setTimeout(() => {
            navigate("/", { replace: true })

          }, 500)

        }
        else {
          navigate(location.pathname ? location.pathname : "/")
        }
        setUser(result)

      }
      else {
        navigate("/login", { replace: true })
      }

    } catch (error) {
      console.log(error)

    }

  }
  //login request
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`https://be-10x-cms.herokuapp.com/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();

      if (!result.error) {
        console.log(result)
        localStorage.setItem("token", result.token)
        setUser(result.user)
        toast.success(`User is logged in as ${result.user.name}`)
        navigate("/", { replace: true })

      }
      else {
        toast.error(result.error)

      }


    } catch (err) {
      console.log(err);
    }
  };

  //register req
  const registerUser = async (userData) => {
    try {
      const res = await fetch(`https://be-10x-cms.herokuapp.com/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();

      if (!result.error) {
        toast.success("User is successfully registered ! Now you can log in into your account !")
        navigate("/login", { replace: true })
      }
      else {
        toast.error(result.error)

      }


    } catch (err) {
      console.log(err);
    }
  };

  return <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>{children}</AuthContext.Provider>
}
export default AuthContext
