
import React, { useEffect } from 'react'
import CoursesPage from './CoursesPage'
import Wrapper from '../Wrapper'

const Courses = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Wrapper>
            <>
                <CoursesPage />
            </>
        </Wrapper>
    )
}

export default Courses