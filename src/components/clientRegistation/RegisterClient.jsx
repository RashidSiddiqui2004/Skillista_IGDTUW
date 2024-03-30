
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import profileimg from '/profile.png'
import myContext from '../../context/data/myContext';
import { auth, fireDB } from '../../firebase/FirebaseConfig';


const ResgisterClient = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [experience, setExperience] = useState(0);
    const [bio, setBio] = useState('');
    const [industry, setIndustry] = useState('');


    const context = useContext(myContext);

    const { loading, setLoading, createClientProfile } = context;

    const navigate = useNavigate();

    const registerAsClient = async () => {
        setLoading(true)

        if (fullName === "" || email === "" || password === "" || industry == '' || gender == '') {
            return toast.error("All fields are required");
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: fullName,
                uid: users.user.uid,
                experience: experience,
                time: Timestamp.now(),
                email: email
            }

            const userRef = collection(fireDB, "users");

            await addDoc(userRef, user);

            await createClientProfile(fullName, users.user.uid, email,
                gender, industry, experience, bio);

            localStorage.setItem('user', JSON.stringify(user))

            setLoading(false)

            toast.success("Joining Successful", {
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
        console.log(userData);
        if (userData && userData.domain !== null && userData.domain !== '') {
            window.location.href = `/profile/${userData?.uid}/${userData?.name}`
        }
    }, [])

    return (
        <div className='mx-auto px-4 py-8 font1'>
            <h1 className='text-3xl font-bold mb-4'>Client Registation</h1>

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
                        <label htmlFor='domain' className='text-white text-lg mb-1 sm:w-[18%]'>Select Gender</label>
                        <select id='domain' className='mt-1 block bg-slate-800 text-white
                     border-slate-800 outline-none sm:px-2 rounded-md
              focus:border-blue-500' value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value='' disabled>Select your Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>female</option>
                        </select>
                    </div>

                    <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                        <label htmlFor='domain' className='text-white text-lg mb-1 sm:w-[18%]'>Select Industry</label>
                        <select id='domain' className='mt-1 block bg-slate-800 text-white
                     border-slate-800 outline-none sm:px-2 rounded-md
              focus:border-blue-500' value={industry} onChange={(e) => setIndustry(e.target.value)}>
                            <option value='' disabled>Select an industry</option>
                            <option value='Finance'>Finance</option>
                            <option value='Technology'>Technology</option>
                            <option value='Consulting'>Consulting</option>
                            <option value='Real Estate'>Real Estate</option>
                            <option value='Hospitality'>Hospitality</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                    </div>


                    <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                        <label htmlFor='experience' className='text-white text-lg mb-1 sm:w-[18%]'>Experience</label>
                        <input type="number" id='experience' value={experience}
                            className='bg-inherit text-slate-200 
                         border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw]
                        focus:border-blue-500' placeholder="What's your experience level in this industry?" onChange={(e) => { setExperience(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                        <label htmlFor='bio' className='text-white text-lg mb-1 sm:w-[18%]'>Bio/About You</label>
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



                    <p className='bg-blue-900 text-white mt-5 py-2 px-28 w-fit
           rounded-md hover:bg-blue-600 transition-colors duration-300 text-xl
           ease-in-out cursor-pointer' onClick={registerAsClient}> {!loading ? 'Register' : 'Registering...'}
                    </p>

                    {/* <p className='bg-slate-900 text-white mt-6 py-2 px-10 w-fit
           rounded-md hover:bg-blue-600 transition-colors duration-300 
           ease-in-out'>
                        Already have an account? <Link to='/login' className='text-slate-200 hover:text-indigo-800'>Log in here</Link>
                    </p> */}

                </div>

                <div className='w-full sm:w-[40vw] py-10'>
                    <div className='bg-slate-900 rounded-md shadow-md 
                        px-4 py-10 font1'>
                        <img src={profileimg} alt="profile-image"
                            className='rounded-full w-32 mx-auto' />

                        <h2 className='text-lg font-semibold pt-2 mb-2'>{fullName}</h2>
                        <h2 className='text-lg font-semibold pt-2 mb-2'>{email}</h2>

                        <h2 className='text-slate-800 bg-white px-10 py-1 mb-2 flex justify-center
             items-center mx-auto w-fit rounded-full'>Industry:{industry}</h2>
                        <h2>Experience: {experience} years</h2>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default ResgisterClient