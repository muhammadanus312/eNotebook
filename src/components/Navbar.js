import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  let navigate = useNavigate();
  let location=useLocation()
  useEffect(() => {
    
  }, [location])

  function logoutclick(){
    localStorage.removeItem('token')
    if(localStorage.getItem('token')===null){
  navigate('/signin');
  props.showalert("Succesfully Logout","success")

    }

    
  }
  return (
    <>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">eNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/notes'?"":"active"}`} aria-current="page" to="/notes">Take Notes</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/yournotes'?"":"active"}`} aria-current="page" to="/yournotes">Your Notes</Link>
        </li>
        
      </ul>
      {localStorage.getItem('token')? <button onClick={logoutclick} type="button" className="btn btn-light mx-4">Logout</button>:
  <div className="d-flex">
  <Link to="/signin" className="btn btn-light mx-3" role="button">Login</Link>
  <Link to="/signup" className="btn btn-light mx-3" role="button">Signup</Link>
  </div>}
    </div>
    
  </div>
  
</nav>
    </>
  )
}
