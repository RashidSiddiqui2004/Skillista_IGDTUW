import React, { useContext, useState } from 'react'
import HerJobProfile from './HerJobProfile';
import myContext from '../../context/data/myContext';

const HireherPage = ({ state }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const context = useContext(myContext);

    const { searchUsersBySkill } = context;

    const user = JSON.parse(localStorage.getItem('user'));

    const handleSearch = async () => {
        setSearchQuery(searchQuery.toLowerCase());
        const fetchedData = await searchUsersBySkill(searchQuery);
        setHasSearched(true);
        setSearchResults(fetchedData);
    };

    return (
        <div className='px-4 py-4 mx-6'>

            <div className=' flex flex-row gap-7 font1'>

                <h1 className='text-2xl font-bold mb-4'>Job Search</h1>

                <div className='flex items-center mb-4'>
                    <input type='text' placeholder='Search by skillset...'
                        className='mr-4 px-3 py-2 border border-gray-300 rounded-md font-semibold text-slate-900 placeholder:text-slate-950
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button className='bg-indigo-600 text-white px-10 py-2 rounded-md
                     hover:bg-indigo-700 focus:outline-none 
                    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' onClick={handleSearch}>Search</button>
                </div>

            </div>


            <h2 className='font1 text-left font-bold text-xl'>Search Results</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5'>

                {searchResults.map(user => (
                    <HerJobProfile key={user.id} user={user} />
                ))}

            </div>

            {
                (searchResults.length === 0)
                && (
                    <h2 className='font1 text-center items-center py-12 sm:pt-28
                    font-bold text-xl'>{!hasSearched ? 'Type a skill to get relevant Skillsters..' : 'Sorry, No Profiles match your query'}.</h2>
                )
            }

        </div>
    )
}

export default HireherPage