import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
import GenderChkbx from './GenderChkbx';

export type Inputs = {
  fullname: string;
  username: string;
  password: string;
  confirmPass: string;
  gender: 'male' | 'female' | ''; // Fixed the extra space
};

const Signup = () => {
  // Inputs State Management
  const [inputs, setInputs] = useState<Inputs>({
    fullname: '',
    username: '',
    password: '',
    confirmPass: '',
    gender: '',
  });

  // Use Signup Hook
  const { loading, signup } = useSignup();

  // Gender Function
  const handleGender = (gender: 'male' | 'female') => {
    setInputs({ ...inputs, gender });
  };

  // Handle Submit Function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop page refresh

    await signup(inputs);
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='Enter Full name'
              className='w-full input input-bordered h-10'
              value={inputs.fullname}
              onChange={(e) =>
                setInputs({ ...inputs, fullname: e.target.value })
              }
            />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter Username'
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPass}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPass: e.target.value })
              }
            />
          </div>

          <GenderChkbx
            onCheckBoxChange={handleGender}
            selectedGender={inputs.gender}
          />

          <Link
            className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
            to='/login'
          >
            Already have an account?
          </Link>

          <div>
            <button
              type='submit'
              className='btn btn-block btn-sm mt-2 border border-slate-700 glow-button'
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
