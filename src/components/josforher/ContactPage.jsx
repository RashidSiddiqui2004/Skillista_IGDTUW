import React, { useContext, useEffect, useState } from 'react'
import Wrapper from '../Wrapper'
import { Link, useParams } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { FaStar } from "react-icons/fa6";

import PDF from '/pdf.svg';
import femaleProfileimg from '/profile.png'
import MaleProfileimg from '/maleProfile.jpg'
import { uploadFile } from '../../utils/uploadFile/UploadFile';
import { toast } from 'react-toastify';

const ContactPage = () => {

    const params = useParams();
    const userID = params.id;
    const username = params.name;

    const [userdata, setUserdata] = useState(null);

    const context = useContext(myContext);

    const { loading, getUserDetails, addResume, hireUser, getMyClientsList,
        sendAcceptMsg, fetchMyEmployees } = context;

    const user = JSON.parse(localStorage.getItem('user'));

    const isUserHerself = (user?.uid === userID);

    const [clientsQueue, setClientsQueue] = useState(null);
    const [employeesList, setEmployees] = useState(null);

    const [calledData, setcalledData] = useState(false);

    const [isHiring, setisHiring] = useState(false);
    const [clientemail, setClientemail] = useState(user?.email);
    const [clientName, setClientName] = useState(user?.name);
    const [details, setDetails] = useState('');

    const [needEditResume, setneedEditResume] = useState(false);

    const acceptJob = async (clientId) => {

        const hasAccepted = await sendAcceptMsg(userID, userdata.name, userdata.email, clientId);

        if (hasAccepted) {
            toast.success('Job accepted successfully.');
        } else {
            toast.success('Error while accepting job.');
        }

    }

    const getMyEmployees = async () => {
        const tempEmpdata = await fetchMyEmployees(user?.uid);
        setcalledData(true);
        setEmployees(tempEmpdata);
        console.log(employeesList);
    }

    // Function to handle file upload
    const handleFileUpload = async (event) => {

        const files = event.target.files;

        let fileURL = null;
        const file = files[0];

        const uploadedFileURL = await uploadFile(file, 'resumes');

        if (uploadedFileURL) {
            fileURL = uploadedFileURL;
        }

        const submitResume = await addResume(userID, uploadedFileURL);

        if (submitResume) {
            toast.success('Resume uploaded successfully.');
        }
        else {
            toast.error('Resume Upload failed.');
        }
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        handleFileUpload({ target: { files } });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const hireHer = async () => {
        if (user === null) {
            toast.error('Pls signup to hire users.')
        }

        else if (details === '') {
            toast.infp("Provide Job details!", {
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
        else if (clientemail == null || clientemail == '') {
            toast.info("Email is reqired for communcation!", {
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

        const isHired = await hireUser(user?.uid, user.name, clientemail, details, userID);

        if (isHired) {
            toast.success("Hiring message sent", {
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
        else {
            toast.error("Hiring Failed, try again later", {
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

    useEffect(() => {
        const fetchdata = async () => {
            const temp = await getUserDetails(userID);
            setUserdata(temp);
            const clientsdata = await getMyClientsList(userID);
            setClientsQueue(clientsdata);
        }
        window.scrollTo(0, 0);

        fetchdata();
    }, [])

    // const editDetails = async () => {
    //     return;
    // }

    return (
        <Wrapper>
            <div className='grid grid-cols-12 pt-10'>

                <div className='col-span-12 sm:col-span-6 flex flex-col items-center justify-center my-auto'>

                    <img src={(userdata?.gender == 'female' || userdata?.gender == null) ? femaleProfileimg : MaleProfileimg} alt="userimage" className='rounded-full w-36 mx-auto' />

                    <div className='gap-2'>
                        <div className='flex flex-row items-center justify-center text-slate-300 text-2xl gap-2 my-3'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <h3 className='font1 my-4 bg-green-400 text-slate-950
                     text-xl font-semibold rounded-full px-6 py-2'>Skillstar</h3>

                    </div>

                    {
                        (userdata && userdata.resume && (userdata.resume !== '')) ?
                            <div className="bg-slate-900 w-[80%] mx-[10%] rounded-3xl border-2 border-black border-dotted flex items-center justify-center">

                                <div className="rounded-full pt-2 pb-4">
                                    <div className="flex flex-col items-center py-2">
                                        <h1 className='font1 text-xl my-2'>Resume</h1>

                                        <p className="cursor-pointer">
                                            <a href={userdata?.resume} target="_blank" rel="noopener noreferrer">
                                                <img className="w-24 h-24" src={PDF} alt="PDF Icon" />
                                            </a>
                                        </p>

                                        {
                                            isUserHerself &&
                                            <h1 className='bg-slate-200 text-slate-800 mt-6 px-6 py-1
                                         rounded-full font1 cursor-pointer' onClick={() => setneedEditResume(true)}>
                                                Update Resume
                                            </h1>
                                        }

                                    </div>
                                </div>
                            </div>

                            :

                            isUserHerself && user.domain && (
                                <div className="bg-slate-900 w-[80%] mx-[10%] rounded-3xl border-2 border-black border-dotted flex items-center justify-center"
                                    onDragOver={handleDragOver} onDrop={handleDrop}>

                                    <div className="rounded-full pt-2 pb-4">
                                        <div className="flex flex-col items-center py-2" onDrop={handleDrop}>

                                            <h1 className='text-lg md:text-2xl mb-2 text-slate-200 mt-2 font2'>{loading ? "Uploading..." : "Upload Resume"}</h1>

                                            <label htmlFor="fileInput" className="cursor-pointer">
                                                <img className="w-24 h-24 cursor-pointer" src={PDF} alt="PDF Icon" />
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    className="hidden"
                                                    multiple
                                                    onChange={handleFileUpload}
                                                />
                                            </label>

                                        </div>
                                    </div>
                                </div>
                            )
                    }

                    {
                        needEditResume &&
                        (
                            <div className="bg-slate-900 w-[80%] mx-[10%] my-6
                            rounded-3xl border-2 border-black border-dotted flex items-center justify-center"
                                onDragOver={handleDragOver} onDrop={handleDrop}>

                                <div className="rounded-full pt-2 pb-4">
                                    <div className="flex flex-col items-center py-2" onDrop={handleDrop}>

                                        <h1 className='text-lg md:text-2xl mb-2 text-slate-200 mt-2 font2'>{loading ? "Uploading..." : "Upload new Resume"}</h1>

                                        <label htmlFor="fileInput" className="cursor-pointer">
                                            <img className="w-24 h-24 cursor-pointer" src={PDF} alt="PDF Icon" />
                                            <input
                                                type="file"
                                                id="fileInput"
                                                className="hidden"
                                                multiple
                                                onChange={handleFileUpload}
                                            />
                                        </label>

                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>

                <div className='col-span-12 sm:col-span-6'>

                    <div className='w-full'>

                        <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                            <label htmlFor='name' className='text-white text-sm mb-1 sm:w-[18%]'>Name</label>
                            <p className='bg-inherit text-slate-200 text-center items-center mx-auto sm:mx-0
             border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw] py-1
              focus:border-blue-500'>{userdata?.name}</p>
                        </div>

                        <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                            <label htmlFor='email' className='text-white text-sm mb-1 sm:w-[18%]'>Email</label>
                            <p className='bg-inherit text-slate-200 text-center items-center mx-auto sm:mx-0
             border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw] py-1
              focus:border-blue-500'>{userdata?.email}</p>
                        </div>

                        {
                            userdata && userdata.domain &&
                            <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                                <label htmlFor='domain' className='text-white text-sm mb-1 sm:w-[18%]'>Specialization</label>
                                <p className='bg-inherit text-slate-200 text-center items-center mx-auto sm:mx-0
                         border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw]
                        focus:border-blue-500 py-1'
                                >{userdata?.domain} </p>
                            </div>
                        }


                        {
                            userdata && userdata.industry &&
                            <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                                <label htmlFor='domain' className='text-white text-sm mb-1 sm:w-[18%]'>Industry</label>
                                <p className='bg-inherit text-slate-200 text-center items-center mx-auto sm:mx-0
                         border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw]
                        focus:border-blue-500 py-1'
                                >{userdata?.industry} </p>
                            </div>
                        }

                        <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                            <label htmlFor='experience' className='text-white text-sm mb-1 sm:w-[18%]'>Experience</label>
                            <p className='bg-inherit text-slate-200 text-center items-center mx-auto sm:mx-0
                         border-b border-slate-800 outline-none sm:px-2 rounded-md w-[30vw]
                        focus:border-blue-500 py-1'
                            >{userdata?.experience} year{userdata?.experience > 1 ? 's' : ''}</p>
                        </div>

                        {
                            userdata && userdata.skills &&
                            <div className="mt-4 flex flex-col sm:flex-row">
                                <h2 className='text-white text-sm mb-1 sm:w-[18%]'>Skills</h2>

                                <div className="flex flex-wrap gap-2 mb-2 ml-10">
                                    {userdata?.skills?.map((skill, index) => (
                                        <div className='rounded-full bg-slate-800 py-2 px-4 text-sm
                            shadow-sm shadow-green-300  hover:scale-95 transition-all' key={index}>
                                            {skill.toUpperCase()}
                                        </div>

                                    ))}
                                </div>
                            </div>
                        }

                        <div className='mb-5 flex flex-col sm:flex-row gap-4 mt-3'>
                            <label htmlFor='experience' className='text-white text-sm mb-1 sm:w-[18%]'>Bio</label>
                            <p className='bg-inherit text-slate-200 text-sm sm:text-start text-center items-center mx-auto sm:mx-0
                         border-b border-slate-800 outline-none sm:px-2 rounded-md w-[80vw] sm:w-[30vw]
                        focus:border-blue-500 py-1'
                            >{userdata?.bio}</p>
                        </div>

                        {
                            (userdata && isUserHerself) ?

                                // <p className='bg-blue-800 flex justify-center items-center mx-auto text-white mt-5 py-2 px-28 w-fit
                                // rounded-md hover:bg-blue-600 ease-in-out cursor-pointer' onClick={editDetails}>
                                //     {!loading ? 'Edit Details' : 'Updating...'}
                                // </p>

                                (userdata && userdata.resume) &&
                                <>
                                    <h2 className='text-lg bg-slate-700 text-slate-200 px-5 py-1
                                     font1 w-fit flex items-center mx-auto rounded-full font1'>Clients list</h2>


                                    <div className=' grid grid-cols-2 gap-2 text-sm my-6 mr-3 font1'>
                                        {
                                            (clientsQueue) &&
                                                (clientsQueue.length > 0) ?
                                                clientsQueue.map((clientData, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className='bg-slate-700 text-slate-300 rounded-md px-4 py-2 
                                                            flex flex-col'>
                                                                <h1 className='text-left items-start'>{clientData.clientName}</h1>

                                                                <h1 className='text-left items-start'>EmailID: {clientData.clientemail}</h1>

                                                                <h2 className='text-left italic'>Job Role Details</h2>
                                                                <h2 className=' text-wrap text-left mt-2'>{clientData.jobDetails}</h2>
                                                                <div className='flex flex-col gap-2 sm:flex-row'>
                                                                    <h2 className='font1 bg-slate-300 text-slate-950 items-center mx-auto my-2
                                                                        text-sm font-semibold rounded-full w-fit px-6 py-2 scale-95 transition-all cursor-pointer'
                                                                        onClick={() => window.location.href = `/profile/${clientData.client}/${clientData.clientName}`}>
                                                                        Visit Profile
                                                                    </h2>

                                                                    <h2 className='font1 bg-slate-300 text-slate-950 items-center mx-auto my-2
                                                                    text-sm font-semibold rounded-full w-fit px-6 py-2 scale-95 transition-all cursor-pointer'
                                                                        onClick={() => acceptJob(clientData.client)}>
                                                                        Accept Job
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })

                                                :

                                                <div>
                                                    <h1 className='text-left items-start'>Sorry, no clients as of now.</h1>
                                                </div>
                                        }

                                    </div>

                                </>

                                :


                                (user && !user.domain) &&

                                <div>

                                    <h3 className='font1 bg-slate-400 text-slate-950 items-center mx-auto my-7
                                text-xl font-semibold rounded-full w-fit px-6 py-2 cursor-pointer scale-95 transition-all'
                                        onClick={() => setisHiring(true)}>
                                        Hire {username}
                                    </h3>

                                    {
                                        isHiring && (
                                            <div className='text-sm font1'>
                                                <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                                                    <label htmlFor='email' className='text-white text-sm mb-1 sm:w-[18%]'>Your Name</label>
                                                    <input type="name" id='name' value={clientName}
                                                        className='bg-inherit text-slate-200 
                                                        border-b border-slate-800 outline-none sm:px-2 rounded-md  w-[30vw]
                                                    focus:border-blue-500' placeholder='Enter your name' onChange={(e) => { setClientName(e.target.value) }}
                                                    />
                                                </div>
                                                <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                                                    <label htmlFor='email' className='text-white text-sm mb-1 sm:w-[18%]'>Your Email-ID</label>
                                                    <input type="email" id='email' value={clientemail}
                                                        className='bg-inherit text-slate-200 
                                                    border-b border-slate-800 outline-none sm:px-2 rounded-md  w-[30vw]
                                                  focus:border-blue-500' placeholder='Enter your email-id' onChange={(e) => { setClientemail(e.target.value) }}
                                                    />
                                                </div>
                                                <div className='mb-5 flex flex-col sm:flex-row gap-4'>
                                                    <label htmlFor='bio' className='text-white text-sm mb-1 sm:w-[18%]'>Details of Job Role</label>
                                                    <textarea
                                                        id='details'
                                                        value={details}
                                                        style={{ height: '6rem' }}
                                                        className='bg-inherit text-slate-200 border
                                                         border-slate-700 outline-none sm:px-2 py-2 rounded-md 
                                                         w-[30vw] focus:border-blue-500'
                                                        placeholder="Give bried description of Job Role..."
                                                        onChange={(e) => { setDetails(e.target.value) }}
                                                    />
                                                </div>

                                                <h3 className='font1 bg-slate-400 text-slate-950 items-center mx-auto my-7
                                                text-lg font-semibold rounded-full w-fit px-6 py-2 cursor-pointer scale-95 transition-all'
                                                    onClick={hireHer}>
                                                    Send to {username}
                                                </h3>

                                            </div>
                                        )
                                    }

                                </div>
                        }

                    </div>

                    {
                        user && !user.domain &&

                        <div className='my-2'>
                            <h2 className='font1 bg-slate-300 text-slate-950 items-center mx-auto my-2
                                text-sm font-semibold rounded-full w-fit px-6 py-2
                                scale-95 transition-all cursor-pointer'
                                onClick={getMyEmployees}>
                                Get Accepted Messages
                            </h2>

                            <div className=' grid grid-cols-2 gap-2 text-sm my-6 mr-3 font1'>
                                {
                                    (employeesList) &&
                                        (employeesList.length > 0) ?
                                        employeesList.map((empData, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className='bg-slate-700 text-slate-300 rounded-md px-4 py-2 
                                                            flex flex-col'>
                                                        <h1 className='text-left text-lg items-start'>{empData.employeeName}</h1>

                                                        <h1 className='text-left items-start'>EmailID: {empData.employeeEmail}</h1>

                                                        <h2 className='text-left italic mt-2'>Job Role Details</h2>

                                                        <h2 className=' text-wrap text-left mt-1'>{empData.jobDetails}</h2>

                                                        <div className='flex flex-col gap-2 sm:flex-row'>
                                                            <h2 className='font1 bg-slate-300 text-slate-950 items-center mx-auto my-2
                                                                        text-sm font-semibold rounded-full w-fit px-6 py-2 scale-95 
                                                                        transition-all cursor-pointer' onClick={() => window.location.href = `/profile/${empData.employeeId}/${empData.employeeName}`}>
                                                                Visit Profile
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })

                                        :

                                        (calledData) &&

                                        <div>
                                            <h1 className='text-left items-start'>Sorry, no new messages as of now.</h1>
                                        </div>
                                }

                            </div>

                        </div>
                    }
                </div>

            </div>
        </Wrapper>
    )
}

export default ContactPage
