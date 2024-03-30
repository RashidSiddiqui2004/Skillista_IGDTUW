
import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";

function Navbar() {

    const [isOpen, setIsopen] = useState(false);

    return (
        <nav className="flex items-center justify-between py-4 fixed top-0 w-[100vw]
        pr-10 border-b-2 bg-slate-950 border-gray-300 z-100 text-white z-50">

            <div className="flex items-center">
                <Link to={'/'}>
                    <p className='text-xl font-semibold font1 px-7'>Skillista</p>
                </Link>
            </div>

            <div className='sm:hidden'>
                {isOpen ? <RxCross1 className='text-2xl cursor-pointer' onClick={() => setIsopen(!isOpen)} /> :
                    <GiHamburgerMenu className='text-2xl cursor-pointer ml-10' onClick={() => setIsopen(!isOpen)} />}
            </div>


            {isOpen &&
                <div className='sm:hidden flex flex-col space-x-20 justify-end text-right items-end
                font-semibold text-lg px-9 font1'>
                    <Link to={'/'} className="hover:text-slate-200 nav-link">
                        Home
                    </Link>
                    <Link to={'/join-skillista'} className="hover:text-slate-200 nav-link">
                        Join as Skillster
                    </Link>
                    <Link to={'/hire-her'} className="hover:text-slate-200 text-pink-600 nav-link">
                        Hire Her
                    </Link>
                    <Link to={'/hire-her'} className="hover:text-slate-200 text-pink-600 nav-link">
                        Join as Client
                    </Link>
                    <Link to={'/courses'} className="hover:text-slate-200 nav-link">
                        Courses
                    </Link>
                    <Link to={'/my-courses'} className="hover:text-slate-200 nav-link">
                        Enrolled Courses
                    </Link>
                    <Link to={'/courses-add'} className="hover:text-slate-200 nav-link">
                        Add Course
                    </Link>
                </div>
            }

            <ul className="hidden sm:flex space-x-12 font-semibold text-sm px-9 font1">

                <Link to={'/'} className="hover:text-slate-200 nav-link">
                    Home
                </Link>
                <Link to={'/join-skillista'} className="hover:text-slate-200 text-slate-200 nav-link">
                    Join as Skillster
                </Link>
                <Link to={'/join-client'} className="hover:text-slate-200 text-green-400 nav-link">
                    Join as Client
                </Link>
                <Link to={'/hire-her'} className="hover:text-slate-200 text-pink-600 nav-link">
                    Hire Her
                </Link>
                <Link to={'/courses'} className="hover:text-slate-200 nav-link">
                    Courses
                </Link>
                <Link to={'/my-courses'} className="hover:text-slate-200 nav-link">
                    Enrolled Courses
                </Link>
                <Link to={'/courses-add'} className="hover:text-slate-200 nav-link">
                    Add Course
                </Link>

            </ul>
        </nav>
    );
}

export default Navbar;



{/* <Link to={'/signup'} className="hover:text-slate-200 nav-link">
                    Sign Up
                </Link> */}