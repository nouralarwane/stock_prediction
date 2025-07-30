import React, {useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../AuthProvider'

const Login = () => {

  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [Loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {IsLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    const userData = {username, password}

    try {
      
      const response = await axios.post("http://127.0.0.1:8000/api/v1/token/", userData)
      localStorage.setItem("accessToken", response.data.access)
      localStorage.setItem("refreshToken", response.data.refresh)
      console.log(response.data);
      navigate("/dashboard")
      setIsLoggedIn(true)
    } 
    catch (error) {
      console.error("Erreur: ", error);
      setError("Invalid credentials")
    }
    finally{
      setLoading(false)
    }

  }


  return (
      <>
        <div className="container">
          
            <div className="row justify-content-center ">
                <div className="col-md-6 bg-light-dark rounded-xl">
                    <h3 className="text-light text-center mb-3">Logging to our portal</h3>
                    <form onSubmit={handleLogin}>

                        <div className="mb-3">
                            <input type="text" className='form-control mb-3' value={username} onChange={(e) => setusername(e.target.value)} placeholder='Enter username' />

                        </div>

                        <div className="mb-3">
                            <input type="password" className='form-control mb-3' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter password' />

                        </div>

                        {error && <div className="text-danger">{error}</div> }

                        {Loading ? (
                        <button type='submit' className='btn btn-success d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin />Logging in...</button>

                        ) : ( 
                        <button type='submit' className='btn btn-success d-block mx-auto'>Login</button>

                        )}


                    </form>
                </div>
            </div>
        </div>
    </>
  )
} 

export default Login