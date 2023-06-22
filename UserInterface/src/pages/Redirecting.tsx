import React from 'react'
import styled from 'styled-components'
import { useEffect } from 'react';
import { container } from '../container';
import { IAuthService } from '../services/IAuthService';
import { SERVICE_KEYS } from '../service-keys-const';

const RedirectingText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Redirecting: React.FunctionComponent = () => {
    //Validate user access
    const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
    authService.validateResourceAccess("Model 3D");

    useEffect(() => {

        setTimeout(() => {
            window.location.href = process.env.REACT_APP_MODEL_3D_URL as string;
          }, 2000);
    }, []);

    return (
        <RedirectingText className='flexOne'>Loading...</RedirectingText>
    )
}


export default Redirecting
