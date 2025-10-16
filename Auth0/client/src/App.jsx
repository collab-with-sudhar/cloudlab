import './App.css'
import {useAuth0} from '@auth0/auth0-react'
function App() {
  const {isAuthenticated,isLoading,user,loginWithRedirect,logout} = useAuth0();
  if(isLoading) return <h5>Loading.....</h5>
  return(
    <>
      {!isAuthenticated?<>
        <h3>Welcome</h3>
        <br />
        <button onClick={()=>loginWithRedirect()}>Login</button>
      </>:<>
        <h3>Welcome-{user.name}</h3>
        <img src={user.picture} alt="" />
        <button onClick={()=>logout({logoutParams:{returnTo:window.location.origin}})}>Logout</button>
      </>}
    </>
  )
}

export default App
