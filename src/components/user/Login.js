import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loader from "../Layout/Loader";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../actions/userAction';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const {isAuthenticated, loading, error} = useSelector((state) => state.auth);

  useEffect(() => {
    if(isAuthenticated){
      window.location.href = "/";
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      {
        loading ? (<Loader/>) : (
            <>
              <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                  <form className='shadow-lg login_form' onSubmit={submitHandler}>
                    <h1 className='mb-3'>
                        Login
                    </h1>
                    <hr className='md-5'/>
                    <div className='form-group'>
                      <label htmlFor='email_field'>Email</label>
                      <input type='email' id='email_field' className='form-control'
                      value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='password_field'>Password</label>
                      <input type='password' id='password_field' className='form-control'
                      value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <Link to="/users/forgetPassword" className='float-right mb-4 forgot_pwd_btn'>
                      Forgot Password
                    </Link>
                    <button id='login_button' className='btn btn-block py3 mb-4' type='submit'>
                      Login
                    </button>
                    <Link to="/users/signup" className='new_user_btn'>
                      New User?
                    </Link>
                  </form>
                </div>
              </div>
            </>
        )
      }
    </>
  )
}

export default Login
