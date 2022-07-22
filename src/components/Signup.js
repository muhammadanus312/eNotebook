import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const host='http://localhost:5000'
export default function Signup() {
  let navigate = useNavigate();
const [user, setuser] = useState({name:"",email:"",password:"",cpassword:""})

const SignupUser=async ()=>{
  // console.log(user.email)
  if(user.password===user.cpassword){
    const response= await fetch(`${host}/api/authentication/createuser`,{
      method:'POST',
      headers:{
        'content-type':'application/json',
      },
      body:JSON.stringify({name:user.name,email:user.email,password:user.password})
    })
  
    const jsonData=await response.json()
    console.log(jsonData)
    if(jsonData.output===true)
    {
      //redirect
      localStorage.setItem('token',jsonData.token)
      // history.push("/")
      navigate('/login');
    }
    else{
      alert(jsonData.error)
    }
  }
  
}
const onchange=()=>{
  // setuser({...user,[e.target.name]:[e.target.value]})
   setuser({name:document.getElementById('name').value ,email:document.getElementById('email').value, password:document.getElementById('password').value,cpassword:document.getElementById('cpassword').value})

}

  return (
    <div className="container">
      <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <div className="container" style={{fontSize:"5rem"}}>eNotebook</div>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="not found"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form >
            <h1 className='container my-4'>Signup</h1>

            <div className="form-outline mb-4">
            <label className="form-label" htmlfor="form3Example3">Name</label>
            <input type="text" id="name" className="form-control form-control-lg" required onChange={onchange}
              placeholder="Enter a valid email address" />
          </div>  
          <div className="form-outline mb-4">
            <label className="form-label" htmlfor="form3Example3">Email address</label>
            <input type="email" id="email" className="form-control form-control-lg" required onChange={onchange}
              placeholder="Enter a valid email address" />
          </div>

          
          <div className="form-outline mb-3">
            <label className="form-label" htmlfor="form3Example4">Password</label>
            <input type="password" id="password" className="form-control form-control-lg" onChange={onchange}
             minLength={5} required placeholder="Enter password" />
          </div>
          <div className="form-outline mb-3">
            <label className="form-label" htmlfor="form3Example4">Confirm Password</label>
            <input type="password" id="cpassword" className="form-control form-control-lg" onChange={onchange}
             minLength={5} required placeholder="Enter password" />
          </div>

          <div className="d-flex justify-content-between align-items-center">
        
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlfor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg" onClick={SignupUser}
              >Signup</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Do you have an account? <a href="/signin"
                className="link-danger">Login</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
