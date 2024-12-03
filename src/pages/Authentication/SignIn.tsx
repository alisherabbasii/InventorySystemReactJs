import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../../components/Loader';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/Slices/AuthSlice';
import { signin } from '../../api/auth';

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signin({ username: username.toLowerCase(), password });
      if(response){
        toast.success("Sign in successful");
        dispatch(authActions.login());
        navigate('/customerAndSuppliers');
        setIsLoading(false);
      }
      
     
    } catch (error) {
      console.error('Signin failed:', error);
      setIsLoading(false);
      toast.error('Sign in failed. Invaild username or password.', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  useEffect(() => {
    // Prevent back navigation
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const handleBackButton = (event:any) => {
    window.history.pushState(null, document.title, window.location.href);
  };
  return (
    <>
      <ToastContainer />

      <div className="flex items-center flex-col-reverse md:flex-row-reverse lg:flex-row-reverse text-stone-800 justify-evenly bg-slate-200 h-screen ">
        <div>
          <div className='globalCardStyle p-8'>
            <div>
            {/* <h2 className="mt-6 text-center text-xl font-bold">
                Inventory Management System
              </h2> */}
              <h2 className="mt-2 text-center text-3xl font-bold">
                Sign in to your account
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleSignin}>
                {/* <input type="hidden" name="remember" value="true" /> */}
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <input
                      id="username"
                      name={username}
                      onChange={(text: any) => {
                        setUsername(text.target.value);
                      }}
                      type="text"
                      autoComplete="text"
                      required
                      className="  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name={password}
                      onChange={(text: any) => {
                        setPassword(text.target.value);
                      }}
                      type="password"
                      autoComplete="current-password"
                      required
                      className="rounded-lg  block w-full px-3 py-2 border border-gray-300   focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>

                  
                </div>

                <div className="flex items-end justify-end">
                  <div className="text-sm">
                    <Link
                      to="/auth/forgetpass"
                      className="font-medium text-blue-500 hover:text-blue-600"
                    >
                      {' '}
                      Forgot password?{' '}
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? <Loader /> : 'Sign In'}
                  </button>
                </div>
              </form>
            </div>
            {/* <hr className="my-4 border-gray-200" /> */}
            <p className="mt-4  text-center text-sm text-gray-600">
              <Link
                to="/auth/admin"
                className="font-medium text-blue-500 hover:text-blue-600"
              >
                Admin Login
              </Link>
            </p>

          
          </div>
        </div>

        {/* <img className=" mt-8 h-5/12 w-5/12 " src={login} alt="login" /> */}
      </div>
    </>
  );
}
