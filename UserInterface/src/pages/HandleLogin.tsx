import React from 'react'
import styled from 'styled-components'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserToken } from '../dtos/User/UserToken';
import { SERVICE_KEYS } from '../service-keys-const';
import { IAuthService } from '../services/IAuthService';
import { container } from '../container';

const RedirectingText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Redirecting: React.FunctionComponent = () => {
    const location = useLocation();
    let user: UserToken | null = null;
    let error: string = '';
    let LoginFailed: boolean;
    if(location.search.includes('error')){
        error = decodeURI(location.search.replace('?error=','') ?? '');
        LoginFailed = true;
    }else{
        const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
        user= authService.setLoginUser(location.search.replace('?info=','')) as UserToken;
        LoginFailed = false;
    }

    const navigate = useNavigate();

    useEffect(() => {
        if(!LoginFailed)
            setTimeout(() => {
                navigate("/");
            }, 2000);
    }, []);

    return (
        <RedirectingText className='flexOne'>{
            LoginFailed ?
            `Login Failed - ${error}` :
            `Welcome ${user?.name}...`
        } </RedirectingText>
    )
}


export default Redirecting
