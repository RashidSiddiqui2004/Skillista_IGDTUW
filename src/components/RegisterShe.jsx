
import React, { useEffect } from 'react'
import Wrapper from './Wrapper'
import RegisterShePage from './RegisterShePage'

const RegisterShe = ({ saveState }) => {

    // localStorage.removeItem('user')
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Wrapper>
            <>
                <RegisterShePage />
            </>
        </Wrapper>
    )
}

export default RegisterShe