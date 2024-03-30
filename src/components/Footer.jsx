import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
    return (
        <footer className='border-t-2 border-opacity-5 border-gray-300 font1'>
            <div className='container mx-auto py-4 flex flex-col md:flex-row items-center justify-between'>
                <Link to={'/'}>
                    <p className='text-xl font-semibold'>Skillista</p> 
                </Link>
                <nav className='flex gap-12 mt-4 md:mt-0'>
                    <Link to={'/courses'} className="hover:text-gray-400 nav-link">
                        Courses
                    </Link>
                    <Link to={'/hire-her'} className="hover:text-gray-400 nav-link">
                        Hire Her
                    </Link>
                    <Link to={'/join-skillista'} className="hover:text-gray-400 nav-link">
                        Join as Skillister
                    </Link>
                </nav>
                <div className='flex items-center gap-4 mt-4 md:mt-0 text-2xl'>
                    <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'><FaTwitter /></a>
                    <a href='https://www.linkedin.com/in/rashid-siddiqui2004/' target='_blank' rel='noopener noreferrer'><FaLinkedin /></a>
                    <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
                </div>
            </div>
            <div className='py-2 text-center'>
                <p className='text-sm'>© {new Date().getFullYear()} Skillista. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
