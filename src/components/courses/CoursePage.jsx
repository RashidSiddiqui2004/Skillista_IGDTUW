
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import Wrapper from '../Wrapper';
import courseImage from '/course.jpg';

const CoursePage = () => {

    const params = useParams();
    const courseId = params.id;
    const token = params.token;

    const [isEnrolled, setisEnrolled] = useState(!(token === '0x00'));

    const [courseData, setCrsData] = useState(null);

    const context = useContext(myContext);

    const { getCourseData, enrollCourse, isEnrolledinCourse } = context;

    const userData = JSON.parse(localStorage.getItem('user'));


    const enrollCourseFn = async () => {

        if (userData.uid === null || userData.uid === undefined) {
            toast.info('Please register with Us to continue')
        } else {
            const isdone = await enrollCourse(userData?.uid, courseId);
            if (isdone) {
                setisEnrolled(true);
            }
        }

    }


    const buttonClasses = 'px-4 py-2 rounded-md hover:scale-95 transition-all focus:outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';

    useEffect(() => {
        const getData = async () => {
            const temp = await getCourseData(courseId);
            setCrsData(temp);
            const isEnrolledToCourse = await isEnrolledinCourse(userData.uid, courseId);

            if (isEnrolledToCourse) { setisEnrolled(true); }
        }

        window.scrollTo(0, 0);

        getData();
    }, [])

    return (
        <Wrapper>
            <div className='grid grid-cols-12 justify-around gap-5 px-4'>

                <div className='col-span-12 sm:col-span-3 border-2'>
                    <img src={courseImage} alt="crsimage" className='h-full w-[100vw]' />

                </div>

                <div className='col-span-12 sm:col-span-9 border-2 font1 py-3 px-8'>

                    <h1 className='text-3xl font-semibold'>{courseData?.title}</h1>

                    <h2 className='text-lg sm:text-sm my-3 text-wrap text-left'>
                        {courseData?.description}
                    </h2>

                    <h2 className='text-lg text-left italic sm:mt-10'>You will get to learn these skills</h2>

                    <ul className="flex flex-col sm:flex-row text-wrap px-5 my-2 gap-2
                     sm:gap-4 text-sm text-left">
                        {
                            courseData?.skills?.map((skill, index) => {
                                return (
                                    <li key={index} className="bg-gray-900 w-fit px-4 py-1 rounded-full text-white">{skill.toUpperCase()}</li>
                                )
                            })
                        }
                    </ul>

                    <h2 className='text-start text-lg sm:my-12'>Course Price <span className='bg-slate-800 px-4 py-1 rounded-md ml-3'>Rs.{courseData?.cost}.00</span></h2>

                    <div className=' flex flex-col sm:flex-row justify-around'>
                        <button className={`${buttonClasses} bg-green-500 text-slate-900 
                        font-bold text-2xl px-5 sm:text-lg my-6 sm:my-4 cursor-pointer`}
                            disabled={isEnrolled} onClick={enrollCourseFn}>
                            {!isEnrolled ? 'Enroll Now' : 'Continue from where you left..'}
                        </button>
                        <button className={` text-slate-900 bg-slate-300 rounded-full py-1
                        font-bold text-lg px-5 sm:text-sm my-6 sm:my-4`}>
                            * 200+ Learners Already Enrolled
                        </button>
                    </div>


                </div>

            </div>
        </Wrapper>
    )
}

export default CoursePage