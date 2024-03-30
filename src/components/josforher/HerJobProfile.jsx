import React from 'react'
import profileimg from '/profile.png'

const HerJobProfile = ({ user }) => {

    const gotoProfile = () => {
        window.location.href = `/profile/${user.uid}/${user.name}`
    }

    return (
        <div className='bg-slate-900 rounded-md shadow-md 
        p-4 font1 h-full flex-grow'>
            <img src={profileimg} alt="profile-image"
                className='rounded-full w-32 mx-auto' />

            <h2 className='text-lg font-semibold pt-2 mb-2'>{user?.name}</h2>

            <h2 className='text-slate-800 bg-white px-10 py-1 mb-2 flex justify-center
             items-center mx-auto w-fit rounded-full'>{user?.domain}</h2>
            <h2>Experience: {user?.experience} years</h2>

            <div className='text-left px-2'>
                <h3>Proficient in:</h3>
                <ul className='list-disc ml-4'>
                    {user?.skills?.map(skill => (
                        <li key={skill} className='text-sm'>{skill.toUpperCase()}</li>
                    ))}
                </ul>
            </div>

            <h2 className='text-slate-800 bg-white px-5 py-1 flex justify-center
             items-center mx-auto font-semibold text-lg cursor-pointer
            w-fit rounded-full' onClick={gotoProfile}>Hire {user?.name}</h2>
        </div>
    );

}

export default HerJobProfile