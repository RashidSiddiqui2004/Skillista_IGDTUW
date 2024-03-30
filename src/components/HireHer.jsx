
import React, { useEffect } from 'react'
import HireherPage from './josforher/HireherPage'
import Wrapper from './Wrapper'

const HireHer = ({ state }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Wrapper>
            <>
                <HireherPage />
            </>
        </Wrapper>
    )
}

export default HireHer