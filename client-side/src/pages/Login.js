import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';


const Login = () => {
  const initialState = {
    email: '',
    password: ''
  }
  const [ userData, setUserData ] = useState(initialState);
  const { email, password } = userData;
  const [ typePass, setTypePass ] = useState(false);

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]:value
    });
  }

  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(userData));
  }

  return(
    <div className='auth_page'>
      <form onSubmit={handleSubmit}>
        <h3 className='text-uppercase text-center mb-4'>Raosphi</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChangeInput} value={email} name="email"/>
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <div className='pass'>
            <input type={ typePass? 'text' : 'password' } className="form-control" id="exampleInputPassword1" onChange={handleChangeInput} value={password} name="password"/>
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={email && password ? false : true}>Login</button>
        <p className='my-2'>
          Don't you have account? <Link to='/register' style={{color: "crimson"}}>Register</Link>
        </p>
      </form>
    </div>
  );
};


export default Login;