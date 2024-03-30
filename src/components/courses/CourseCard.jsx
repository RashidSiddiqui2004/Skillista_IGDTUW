import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";

const CourseCard = ({ course, isEnrolled }) => {

    const context = useContext(myContext);
    const { enrollCourse } = context;

    const cardClasses = 'bg-gray-800 rounded-md shadow-md p-4 flex-grow h-full text-white font1';
    const buttonClasses = 'px-4 py-2 rounded-md hover:scale-95 transition-all focus:outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';


    const userData = JSON.parse(localStorage.getItem('user'));

    const enrollCourseFn = async () => {

        if (userData.uid === null || userData.uid === undefined) {
            toast.info('Please register with Us to continue')
        } else {
            const isdone = await enrollCourse(userData?.uid, course.id);
        }

    }

    return (
        <div className={cardClasses}>
            <h2 className='text-lg font-semibold mb-2'>{course.title}</h2>

            <p className='text-sm text-gray-300 mb-4'>{course.description}</p>

            <ul className="flex flex-col text-wrap px-5 gap-1 text-sm text-left">
                {
                    course.skills.map((skill, index) => {
                        return (
                            <li key={index} className="bg-gray-900 w-fit px-4 py-1 rounded-full text-white">{skill.toUpperCase()}</li>
                        )
                    })
                }
            </ul>

            <div className=" flex justify-center items-center mx-auto gap-3">

                {!isEnrolled &&
                    <button className={`${buttonClasses} bg-slate-950 text-white my-2`}
                        onClick={enrollCourseFn}>
                        Enroll Now
                    </button>
                }

                <button className={`${buttonClasses} bg-white text-slate-900 my-2 cursor-pointer`}
                    onClick={() => {
                        if (isEnrolled) {
                            window.location.href = `/course/${course.id}/${userData.uid}`
                        } else {
                            window.location.href = `/course/${course.id}/0x00`
                        }
                    }}
                >
                    View Course
                </button>
            </div>



        </div >
    );
};

export default CourseCard;