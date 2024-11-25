import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupimg from '../../images/logo/signup.svg';
import logo from '../../images/logo/lmslogo.png';
import { signup } from '../../api/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../../components/Loader';
export default function SignUp() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [contact, setcontact] = useState('');
  const [address, setaddress] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let obj = {
      address,
      contact,
      email,
      firstName,
      lastName,
      password,
      username: username.toLowerCase(),
    };
    try {
      // console.log('obj', obj);
      const response = await signup(obj);
      // console.log('Signup successful:', response.data);

      toast.success('Signup in successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Signup failed:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className=" text-stone-800 flex flex-col-reverse md:flex-row-reverse lg:flex-row-reverse items-center justify-evenly bg-slate-200 h-screen ">
        <div>
          <div className='globalCardStyle p-8'>
            <div>
              <img className="mx-auto h-12 " src={logo} alt="Workflow" />
              <h2 className="mt-2  text-center text-3xl font-extrabold">
                Sign Up for an account
              </h2>
              <form className="mt-6 space-y-6" onSubmit={handleSignup}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label className="sr-only">Full Name</label>
                    <input
                      id="firstName"
                      name={firstName}
                      onChange={(text: any) => {
                        setfirstName(text.target.value);
                      }}
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300   rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="sr-only">Last Name</label>
                    <input
                      id="lastName"
                      name={lastName}
                      onChange={(text: any) => {
                        setlastName(text.target.value);
                      }}
                      type="text"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300   focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Last Name"
                    />
                  </div>

                  <div>
                    <label className="sr-only">Username</label>
                    <input
                      id="username"
                      name={username}
                      onChange={(text: any) => {
                        setUsername(text.target.value);
                      }}
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300   focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label className="sr-only">Email address</label>
                    <input
                      id="email"
                      name={email}
                      onChange={(text: any) => {
                        setEmail(text.target.value);
                      }}
                      type="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300   focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>

                  <div>
                    <label className="sr-only">Password</label>
                    <input
                      id="password"
                      name={password}
                      onChange={(text: any) => {
                        setPassword(text.target.value);
                      }}
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300   focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>

                  <div>
                    <label htmlFor="Contact" className="sr-only">
                      Contact
                    </label>
                    <input
                      id="contact"
                      name={contact}
                      onChange={(text: any) => {
                        setcontact(text.target.value);
                      }}
                      type="text"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300   focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Contact"
                    />
                  </div>

                  <div>
                    <label className="sr-only">Address</label>
                    <input
                      id="address"
                      name={address}
                      onChange={(text: any) => {
                        setaddress(text.target.value);
                      }}
                      type="text"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Address"
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? <Loader /> : 'Sign up'}
                  </button>
                </div>
              </form>
            </div>
            <hr className="my-4 border-gray-200" />
            <p className="mt-4 text-center text-sm text-gray-600">
              Have an account?
              <Link
                to="/"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <img className=" mt-8 w-5/12 " src={signupimg} alt="login" />
      </div>
    </>
  );
}
