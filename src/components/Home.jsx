
import React, { useEffect } from 'react'
import Wrapper from './Wrapper'
import Heropage from './Heropage'
import Features from './Features'

const Home = ({ state }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Wrapper>
            <>
                <Heropage />
                <Features />
            </>
        </Wrapper>
    )
}

export default Home