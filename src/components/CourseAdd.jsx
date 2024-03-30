
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/data/myContext';
import { toast } from 'react-toastify';
import courseImage from '/course.jpg'
import Wrapper from './Wrapper';


const CourseAdd = () => {

    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [desc, setDesc] = useState('');

    const [skills, setSkills] = useState([]);

    const context = useContext(myContext);

    const { loading, setLoading, createCourse } = context;

    const [currentSkill, setCurrentSkill] = useState('');

    const handleInputChange = (e) => {
        const newskill = e.target.value;
        setCurrentSkill(newskill);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && currentSkill.trim() !== '') {
            setSkills([...skills, currentSkill.trim().toLowerCase()]);
            setCurrentSkill('');
        }
    };

    const handleSkillRemove = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const navigate = useNavigate();

    const courseupload = async () => {
        setLoading(true)

        if (title === "" || cost === "" || selectedDomain === '' || desc === '') {
            return toast.error("All fields are required")
            setLoading(false);
        }
        else if (desc.length < 10) {
            return toast.info("Please add more description!")
            setLoading(false);
        }
        else {
            await createCourse(title, cost, selectedDomain, desc, skills);
            setLoading(false);
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Wrapper>
            <div className='mx-auto px-4 py-8 font1'>
                <h1 className='text-3xl font-bold mb-4'>Upload Course</h1>

                <div className='rounded-2xl sm:mx-5 my-5 col-span-12 md:col-span-8
             flex flex-col sm:flex-row  mx-auto sm:px-10 py-8 border-2'>

                    <div className='w-full sm:w-[60vw]'>

                        <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                            <label htmlFor='name' className='text-white text-lg mb-1 sm:w-[18%]'>Name</label>
                            <input type="text" id='name' value={title} className='bg-inherit text-slate-200 
            border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw]
             focus:border-blue-500' placeholder="Course name" onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </div>

                        <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                            <label htmlFor='domain' className='text-white text-lg mb-1 sm:w-[18%]'>Domain</label>
                            <select id='domain' className='mt-1 block bg-slate-800 text-white
                     border-slate-800 outline-none sm:px-2 rounded-md
              focus:border-blue-500' value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
                                <option value='' disabled>Select a domain</option>
                                <option value='Blockchain Development'>Blockchain Development</option>
                                <option value='Full Stack Development'>Full Stack Development</option>
                                <option value='Machine Learning'>Machine Learning</option>
                                <option value='DSA'>DSA</option>
                                <option value='Graphic Designing'>Graphic Designing</option>
                                <option value='Deep Learning'>Deep Learning</option>
                                <option value='Digital Marketing'>Digital Marketing</option>
                            </select>
                        </div>

                        <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                            <label htmlFor='cost' className='text-white text-lg mb-1 sm:w-[18%]'>Price of Course</label>
                            <input type="number" id='experience' value={cost}
                                className='bg-inherit text-slate-200 
                         border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw]
                        focus:border-blue-500' placeholder="What's your course price?" onChange={(e) => { setCost(e.target.value) }}
                            />
                        </div>

                        <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                            <label htmlFor='description' className='text-white text-lg mb-1 sm:w-[18%]'>Course description</label>
                            <textarea
                                id='bio'
                                value={desc}
                                style={{ height: '8rem' }}
                                className='bg-inherit text-slate-200 border
                             border-slate-700 outline-none sm:px-2 py-2 rounded-md 
                             w-[30vw] focus:border-blue-500'
                                placeholder="Tell us about the course ..."
                                onChange={(e) => { setDesc(e.target.value) }}
                            />
                        </div>

                        {/* skills */}

                        <div className="mt-4">
                            <h2 className='text-white flex justify-start text-xl mb-4 font-semibold ml-3'>Skills</h2>

                            <div className="flex flex-wrap gap-2 mb-2">
                                {skills.map((skill, index) => (
                                    <div className='rounded-full bg-slate-800 py-1 px-4 text-sm
                            shadow-sm shadow-green-300  hover:scale-95 transition-all' key={index}>
                                        {skill.toUpperCase()}
                                        <button
                                            onClick={() => handleSkillRemove(index)}
                                            className={`rounded-full text-white pl-4 py-1`}
                                        >
                                            &#x2715;
                                        </button>
                                    </div>

                                ))}
                            </div>

                            <input
                                type="text"
                                value={currentSkill}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                                placeholder="Type and press Enter to add skills here"
                                className=' bg-inherit mb-4 px-2 py-2 w-full rounded-lg inputbox text-white 
                        placeholder:text-gray-200 outline-none'
                            />
                        </div>


                        <p className='bg-blue-900 text-white mt-5 py-2 px-28 w-fit
           rounded-md hover:bg-blue-600 transition-colors duration-300 text-xl
           ease-in-out cursor-pointer' onClick={courseupload} disabled={loading}> {!loading ? 'Upload Course' : 'Uploading...'}
                        </p>

                    </div>

                    <div className='w-full sm:w-[40vw] py-10'>
                        <div className='bg-slate-900 rounded-md shadow-md 
                        px-4 py-10 font1'>
                            <img src={courseImage} alt="profile-image"
                                className='rounded-md w-64 mx-auto' />

                            <h2 className='text-lg font-semibold pt-2 mb-2'>{title}</h2>
                            <h2 className='text-slate-800 bg-white px-10 py-1 mb-2 flex justify-center
             items-center mx-auto w-fit rounded-full'>Domain:{selectedDomain}</h2>
                            <h2>Cost: Rs {cost}.00</h2>
                            <div className='text-left px-2'>
                                <h3>Skills to learn:</h3>
                                <ul className='list-disc ml-4'>
                                    {skills?.map(skill => (
                                        <li key={skill}>{skill.toUpperCase()}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Wrapper>
    );
};

export default CourseAdd