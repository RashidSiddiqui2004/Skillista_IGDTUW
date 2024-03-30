
import React from 'react'
import { useState } from "react";
import ABI from "./ABI.json";
import Web3 from "web3";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// images imported here
import graphics from '/woman.jpg'

const Signup = ({ saveState }) => {

  const [connected, setConnected] = useState(true);
  const isAndroid = /android/i.test(navigator.userAgent);
  const init = async () => {
    try {

      if (typeof window.ethereum === 'undefined') {
        toast.info("Metamask is not installed", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new web3.eth.Contract(
        ABI,
        "0xD76852B784ec1Ec11Db89dABeE7a0DAC2FDEB466"
      );
      setConnected(false);
      saveState({ web3: web3, contract: contract });
      toast.success("Connection successful", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log("error");
      return toast.error("Error connecting with MetaMask", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

  }

  return (
    <div className="flex flex-col sm:flex-row justify-around">

      {isAndroid && <button className="connectBTN">
        <a href="https://metamask.app.link/dapp/sriche.netlify.app/">Click For Mobile</a>
      </button>}

      <div className=' flex flex-col justify-center items-center text-center min-h-screen
       bg-slate-800 w-[100vw] sm:w-[50vw]'>

        <h1 className=' text-4xl font-bold py-5 font1'>Skillista</h1>

        <h1 className='py-2 text-xl font-semibold font2'> Welcome to Skillista - Empowering Women Through Skills!</h1>

        <h2 className='font1 text-3xl'>Why Join Skillista?</h2>

        <div className='flex flex-col py-4 justify-start font1 text-start items-start'>

          <div className='flex flex-row gap-2 py-1 text-xl bg-slate-900 px-6
            rounded-md shadow-md shadow-gray-400 w-full my-1'>
            <IoCheckmarkDoneCircle className='mt-1 text-lg' /><p> Monetize Your Skills</p>
          </div>

          <div className='flex flex-row gap-2 py-1 text-xl bg-slate-900 px-6
            rounded-md shadow-md shadow-gray-400  w-full my-1'>
            <IoCheckmarkDoneCircle className='mt-1 text-lg' /><p> Connect with Clients</p>
          </div>

          <div className='flex flex-row gap-2 py-1 text-xl bg-slate-900 px-6
            rounded-md shadow-md shadow-gray-400  w-full my-1'>
            <IoCheckmarkDoneCircle className='mt-1 text-lg' /><p> Secure Transactions</p>
          </div>

          <div className='flex flex-row gap-2 py-1 text-xl bg-slate-900 px-6
            rounded-md shadow-md shadow-gray-400  w-full my-1'>
            <IoCheckmarkDoneCircle className='mt-1 text-lg' /><p>  Build Your Reputation</p>
          </div>

          <div className='flex flex-row gap-2 py-1 text-xl bg-slate-900 px-6
            rounded-md shadow-md shadow-gray-400  w-full my-1'>
            <IoCheckmarkDoneCircle className='mt-1 text-lg' /><p> Community Engagement</p>
          </div>

        </div>


        <h2 className='mt-6 font2 text-xl hover:scale-105 transition-all'>Join today and take your Skills ❤️ to new heights!</h2>

      </div>


      <div className='flex flex-col justify-center items-center text-center my-auto 
        mx-auto w-[100vw] sm:w-[50vw] bg-slate-950 h-screen'>
        <img src={graphics} alt="Amazing image" className='w-72 h-auto rounded-xl mb-3' />

        <button className="px-10 py-3 rounded-full bg-white z-50 shadow-sm mt-9
         shadow-green-500 text-slate-950 font2 font-semibold" onClick={init} disabled={!connected}>
          {connected ? "Register with Metamask" : "Connected"}
        </button>
      </div>

    </div>
  )
}

export default Signup