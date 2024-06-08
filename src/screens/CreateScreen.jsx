import React, { useState } from 'react';
import Header from '../components/Header';
import { db } from '../../utils';
import { Ideas } from '../../utils/schema';
import { Navigate, useNavigate } from "react-router-dom";


const CreateScreen = () => {
  const storageValue = JSON.parse(localStorage.getItem('username'));
  console.log(storageValue)
 
  const [idea, setIdea] = useState('');   
  const [username, setUsername] = useState(storageValue ? storageValue : '');
  const [confirm,setConfirm]=useState(false)
  const navigate = useNavigate();
  function handleClick(){

    navigate('/')
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({idea,username})
    
    const result = await db.insert(Ideas).values({
      content: idea,
      username: username,
      createdAt: new Date().toLocaleDateString(),
    }).returning({ id: Ideas.id });

    if (result) {
      localStorage.setItem('username', JSON.stringify(username));
      setIdea('');
      setConfirm(true)
      setTimeout(() => {
        setConfirm(false);
      }, 3000);

    }
  };
  return (
    <div className="flex flex-col pt-10 md:gap-10 gap-5 md:p-10 p-4">
      <Header />
      {/* <button className="btn">back</button> */}
      {confirm && <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          color='white'
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className='text-white'>Your Idea has been added!</span>
      </div> }
      
      <h1 className="md:p-2 text-[35px] md:text-5xl font-semibold md:w-[900px]">
        From Concept to Create : Empowering your Start-Up Journey.
      </h1>

      <div>
        <label className="form-control">
          <div className="label">
            <span
              className="label-text"
              
            >
              What is your Idea?
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Write your Idea here."
            value={idea}
              onChange={(e) => setIdea(e.target.value)}
          ></textarea>
        </label>
      </div>
      <div className="">
        <div className="label">
          <span
            className="label-text"
            
          >
            Your Username
          </span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col gap-2 md:p-4">
        <button className="btn bg-blue-600 text-white text-lg" disabled={!(idea && username)} onClick={onSubmit}>Send</button>
        <button className="btn bg-gray-600 text-white text-lg" onClick={handleClick}>back</button>
      </div>
    </div>
  );
};

export default CreateScreen;
