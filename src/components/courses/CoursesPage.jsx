import React, { useContext, useEffect } from 'react'
import girl from '/learner.jpg'
import CourseCard from './CourseCard'
import myContext from '../../context/data/myContext'


const CoursesPage = () => {

    const context = useContext(myContext);

    const { courses, getAllCourses } = context;

    const skillHer = () => {
        window.location.href = "#courses"
    }

    useEffect(() => {
        const fetchData = async () => {
            await getAllCourses();
        }
        fetchData();
    }, [])

    return (

        <div className='my-10'>
            <div className='flex flex-col sm:flex-row justify-around items-center text-center'>

                <div className='w-screen sm:w-[50vw] text-left px-6'>
                    <h2 className='font2 text-lg font-semibold'>Welcome to, </h2>
                    <h1 className='text-5xl font2 font-extrabold stroke-slate-50 mb-2'>Skillista</h1>
                    <h2 className='text-3xl font1 font-extrabold stroke-slate-50'>Empowering Women, Celebrating Skills</h2>
                    <h2 className='text-3xl font1 font-extrabold stroke-slate-50'> Discover Your Potential </h2>
                    <p className='text-lg my-4 font1'>Empower yourself with new skills and opportunities

                    </p>
                    <div className='flex flex-row gap-6 text-lg'>
                        <h3 className='w-fit px-10 py-3 rounded-full bg-white z-10 shadow-sm mt-9
         shadow-green-500 text-slate-950 font1 font-semibold cursor-pointer' onClick={skillHer}>View Amazing Courses</h3>
                    </div>

                    <p className='text-lg my-4 font1 italic pl-2'>Take the first step towards a brighter future</p>
                </div>


                <div className='w-screen sm:w-[40vw] text-left px-6 items-center justify-center my-auto py-12'>
                    <img src={girl} alt="woman in tech" className=' rounded-full' />
                </div>

            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 pt-32 py-5' id='courses'>
                {
                    courses.map((course, index) => {
                        return (
                            <div key={index} className='col-span-1'>
                                <CourseCard course={course} isEnrolled={false} />
                            </div>

                        )
                    })
                }

            </div>
        </div>

    )
}

export default CoursesPage