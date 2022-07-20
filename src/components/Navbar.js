import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function Navbar() {
  let location=useLocation()
  useEffect(() => {
      console.log(location.pathname)
    
  }, [location])
  
  return (
    <>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">eNotebook</Link>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname=='/home'?"":"active"}`} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname=='/about'?"":"active"}`} aria-current="page" to="/about">About</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
