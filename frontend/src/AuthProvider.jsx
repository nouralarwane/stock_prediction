import React, {useState, useContext, createContext} from 'react'


// Create the context
const AuthContext = createContext()


const AuthProvider = ({children}) => {

    const [IsLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken')
    )

  return (
    <AuthContext.Provider value={{IsLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext};