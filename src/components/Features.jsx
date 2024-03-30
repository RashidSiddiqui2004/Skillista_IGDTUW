import React from 'react';

const Features = () => {
    return (
        <div className='pt-20 pb-10 font1 px-4 sm:px-2'>
            <h2 className='sm:text-5xl mb-12 text-center font-bold'>Why to Choose Skillista?</h2>

            <div className='flex flex-wrap justify-center gap-6'>

                <div className='max-w-md bg-slate-800 rounded-md shadow-lg shadow-slate-500 p-6'>
                    <h3 className='text-xl font-semibold mb-2'>Personalized Learning</h3>
                    <p className='text-slate-200'>Get personalized learning paths tailored to your goals and interests.</p>
                </div>

                <div className='max-w-md  bg-slate-800 rounded-md shadow-lg shadow-slate-500  p-6'>
                    <h3 className='text-xl font-semibold mb-2'>Expert Instructors</h3>
                    <p className='text-slate-200'>Learn from industry experts and experienced instructors.</p>
                </div>

                <div className='max-w-md  bg-slate-800 rounded-md shadow-lg shadow-slate-500 p-6'>
                    <h3 className='text-xl font-semibold mb-2'>Interactive Learning</h3>
                    <p className='text-slate-200'>Engage in interactive lessons and hands-on projects.</p>
                </div>

                <div className='max-w-md  bg-slate-800 rounded-md shadow-lg shadow-slate-500 p-6'>
                    <h3 className='text-xl font-semibold mb-2'>Flexible Schedule</h3>
                    <p className='text-slate-200'>Study at your own pace and on your schedule.</p>
                </div>

                <div className='max-w-md  bg-slate-800 rounded-md shadow-lg shadow-slate-500 p-6'>
                    <h3 className='text-xl font-semibold mb-2'>Career Growth</h3>
                    <p className='text-slate-200'>Advance your career with practical skills and industry insights.</p>
                </div>

                <div className='max-w-md  bg-slate-800 rounded-md shadow-lg shadow-slate-500 p-6'>
                    <h3 className='text-xl font-semibold mb-2'>Community Support</h3>
                    <p className='text-slate-200'>Join a supportive community of learners and professionals.</p>
                </div>
            </div>
        </div>
    );
};

export default Features;
