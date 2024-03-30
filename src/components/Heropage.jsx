
import React from 'react'
import girl from '/woman2vr.jpg'

const Heropage = () => {

  const skillHer = () => {
    window.location.href = "/join-skillista"
  }

  const gotoSignup = () => {
    window.location.href = "/signup"
  }


  return (
    <div className='flex flex-col sm:flex-row justify-around items-center text-center'>

      <div className='w-screen sm:w-[50vw] text-left px-6'>
        <h2 className='font2 text-lg font-semibold'>Welcome to, </h2>
        <h1 className='text-5xl font2 font-extrabold stroke-slate-50 mb-2'>Skillista</h1>
        <h2 className='text-3xl font1 font-extrabold stroke-slate-50'>Empowering Women, Celebrating Skills</h2>
        <h2 className='text-3xl font1 font-extrabold stroke-slate-50'> Where Expertise Meets Opportunity! </h2>
        <p className='text-lg my-4 font1'> Empowering women by creating a marketplace where they can monetize their skills and expertise.</p>
        <div className='flex flex-col justify-center sm:justify-start items-center mx-auto sm:flex-row gap-2 sm:gap-6 text-lg'>
          <h3 className='w-fit px-10 py-3 rounded-full bg-white shadow-sm mt-9 z-10
         shadow-green-500 text-slate-950 font1 font-semibold cursor-pointer' onClick={gotoSignup}>Start Exploring</h3>
          <h3 className='w-fit px-10 py-3 rounded-full bg-white z-10 shadow-sm mt-9
         shadow-green-500 text-slate-950 font1 font-semibold cursor-pointer' onClick={skillHer}>Join as a Skillster</h3>
        </div>

      </div>


      <div className='w-screen sm:w-[50vw] text-left px-6 items-center justify-center my-auto py-12'>
        <img src={girl} alt="woman in tech" className=' rounded-full' />
      </div>

    </div>
  )
}

export default Heropage