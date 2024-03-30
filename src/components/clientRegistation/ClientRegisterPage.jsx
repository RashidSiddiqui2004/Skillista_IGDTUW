
import React, { useEffect } from 'react'
import Wrapper from '../Wrapper';
import RegisterClient from './RegisterClient';

const ClientRegisterPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Wrapper>
            <>
                <RegisterClient />
            </>
        </Wrapper>
    )
}

export default ClientRegisterPage