import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
  const [inputs, setInputs] = useState({
		fullname: "",
		username: "",
    email:"",
		password: "",
		confirmPassword: "",
	});

	const { loading, signup } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};
  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-lg min-w-96">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-base font-medium text-gray-700">
                Full Name
              </label>
              <input type="text" required placeholder='Enter Full Name' className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={inputs.fullname} onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}/>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700">
                Username
              </label>
              <input type="text" required placeholder='Enter Username' className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700">
                Email
              </label>
              <input type="email" required placeholder='Enter Email' className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700">
                Password
              </label>
              <input type="password" required placeholder='Enter Password' className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700">
                Confirm Password
              </label>
              <input type="password" required placeholder='Confirm Password' className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}/>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="mt-2 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
