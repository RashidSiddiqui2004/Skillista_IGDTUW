
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import profileimg from '/profile.png'


const RegisterShePage = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState(0);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [bio, setBio] = useState('');

    const [skills, setSkills] = useState([]);

    const context = useContext(myContext);

    const { loading, setLoading, createUserJobProfile } = context;

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


    const registerAsSkillster = async () => {
        setLoading(true)

        if (fullName === "" || email === "" || password === "" || selectedDomain === '' || skills.length === 0) {
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: fullName,
                uid: users.user.uid,
                domain: selectedDomain,
                skills: skills,
                experience: experience,
                time: Timestamp.now()
            }

            const userRef = collection(fireDB, "users")

            await addDoc(userRef, user);

            await createUserJobProfile(fullName, users.user.uid, email, selectedDomain, skills, experience, bio);

            localStorage.setItem('user', JSON.stringify(user))

            setLoading(false)

            toast.success("Joined Successfully", {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setFullName("");
            setEmail("");
            setPassword("");
            setSelectedDomain("");
            setExperience(0);
            setLoading(false)

            navigate('/')
        } catch (error) {
            console.log(error)

            toast.info("User already exists!", {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);

        }
    }

    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (userData && userData?.domain !== null && userData?.domain !== '') {
            window.location.href = `/profile/${userData?.uid}/${userData?.name}`
        }
    }, [])

    return (
        <div className='mx-auto px-4 py-8 font1'>
            <h1 className='text-3xl font-bold mb-4'>Register as Skillster</h1>

            <div className='rounded-2xl sm:mx-5 my-5 col-span-12 md:col-span-8
             flex flex-col sm:flex-row  mx-auto sm:px-10 py-8 border-2'>

                <div className='w-full sm:w-[60vw]'>

                    <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                        <label htmlFor='name' className='text-white text-lg mb-1 sm:w-[18%]'>Name</label>
                        <input type="text" id='name' value={fullName} className='bg-inherit text-slate-200 
            border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw]
             focus:border-blue-500' placeholder="Your good name?" onChange={(e) => { setFullName(e.target.value) }}
                        />
                    </div>
                    <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                        <label htmlFor='email' className='text-white text-lg mb-1 sm:w-[18%]'>Email</label>
                        <input type="email" id='email' value={email}
                            className='bg-inherit text-slate-200 
             border-b border-slate-800 outline-none sm:px-2 rounded-md  w-[30vw]
              focus:border-blue-500' placeholder='Enter your email' onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                        <label htmlFor='password' className='text-white text-lg mb-1 sm:w-[18%]'>Password</label>
                        <input type="password" id='password' value={password}
                            className='bg-inherit text-slate-200 
             border-b border-slate-800 outline-none sm:px-2 rounded-md  w-[30vw]
              focus:border-blue-500' placeholder='Enter your password' onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                        <label htmlFor='domain' className='text-white text-lg mb-1 sm:w-[18%]'>Select Domain</label>
                        <select id='domain' className='mt-1 block bg-slate-800 text-white
                     border-slate-800 outline-none sm:px-2 rounded-md
              focus:border-blue-500' value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
                            <option value='' disabled>Select a domain</option>
                            <option value='Crypto'>Blockchain Developer</option>
                            <option value='Full Stack Developer'>Full Stack Developer</option>
                            <option value='ML Engineer'>ML Enginner</option>
                            <option value='Tutoring'>Tutoring</option>
                            <option value='Marketing'>Marketing</option>
                            <option value='Consultancy'>Consultancy</option>
                            <option value='Financial Advisor'>Financial Advisor</option>
                        </select>
                    </div>

                    <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                        <label htmlFor='experience' className='text-white text-lg mb-1 sm:w-[18%]'>Experience</label>
                        <input type="number" id='experience' value={experience}
                            className='bg-inherit text-slate-200 
                         border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw]
                        focus:border-blue-500' placeholder="What's your experience level in this domain?" onChange={(e) => { setExperience(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                        <label htmlFor='experience' className='text-white text-lg mb-1 sm:w-[18%]'>Bio/About You</label>
                        <textarea
                            id='bio'
                            value={bio}
                            style={{ height: '8rem' }} // Set the height using the style attribute
                            className='bg-inherit text-slate-200 border
                             border-slate-700 outline-none sm:px-2 py-2 rounded-md 
                             w-[30vw] focus:border-blue-500'
                            placeholder="Tell us about you, your work..."
                            onChange={(e) => { setBio(e.target.value) }}
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
           ease-in-out cursor-pointer' onClick={registerAsSkillster}> {!loading ? 'Register' : 'Registering...'}
                    </p>

                    <p className='bg-slate-900 text-white mt-6 py-2 px-10 w-fit
           rounded-md hover:bg-blue-600 transition-colors duration-300 
           ease-in-out'>
                        Already have an account? <Link to='/login' className='text-slate-200 hover:text-indigo-800'>Log in here</Link>
                    </p>

                </div>

                <div className='w-full sm:w-[40vw] py-10'>
                    <div className='bg-slate-900 rounded-md shadow-md 
                        px-4 py-10 font1'>
                        <img src={profileimg} alt="profile-image"
                            className='rounded-full w-32 mx-auto' />

                        <h2 className='text-lg font-semibold pt-2 mb-2'>{fullName}</h2>
                        <h2 className='text-slate-800 bg-white px-10 py-1 mb-2 flex justify-center
             items-center mx-auto w-fit rounded-full'>Domain:{selectedDomain}</h2>
                        <h2>Experience: {experience} years</h2>
                        <div className='text-left px-2'>
                            <h3>Proficient in:</h3>
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
    );
};

export default RegisterShePage