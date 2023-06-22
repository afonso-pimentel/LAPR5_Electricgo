import React from 'react'
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components'
import { container } from '../container';
import { SERVICE_KEYS } from '../service-keys-const';
import { IAuthService } from '../services/IAuthService';

const HomeText = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
    object-fit: none;
`

const Home: React.FunctionComponent = () => {
    //Validate user access
    const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
    authService.validateResourceAccess("Home");

    return (
        <>
            <HomeText className="flexOne" data-testid='homeText' src='./logo512.png' alt="Home" title='Logo' >
            </HomeText>
            <ToastContainer />
        </>
    )
}

export default Home
