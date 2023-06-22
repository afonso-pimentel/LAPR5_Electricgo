import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import * as FaIcons from 'react-icons/fa'

import { SidebarData } from './SidebarData';

import { NavLink } from "react-router-dom";
import { useMedia } from 'react-use';

import './Sidebar.css';
import { container } from '../../container';
import { IAuthService } from '../../services/IAuthService';
import { SERVICE_KEYS } from '../../service-keys-const';
import { UserToken } from '../../dtos/User/UserToken';
import { Dropdown } from 'react-bootstrap';
import { IUserService } from '../../services/IUserService';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';


const Navbar = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 3.5rem;
    background-color: #202124;
`

const MenuIconOpen = styled(Link)`
    display: flex;
    justify-content: start;
    font-size: 1.5rem;
    margin-left: 1rem;
    color: #ffffff;
`

const MenuIconClose = styled(Link)`
    display: flex;
    justify-content: end;
    font-size: 1.5rem;
    margin-top: 0.75rem;
    margin-right: 1rem;
    color: #ffffff;
`

const SidebarMenu = styled.div<{close: boolean}>`
    width: 325px;
    height: 100vh;
    background-color: #202124;
    transition: width 0.3s ease-in-out;
    position: fixed;
    top: 0;
    left: ${({ close}) => close ? '0' : '-100%'};
`

const MenuItems = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 90px;
    padding: 1rem 0 1.25rem;
`

const MenuItemLinks = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 20px;
    text-decoration: none;
    color: #ffffff;

    &:hover {
        background-color: #ffffff;
        color: #202124;
        width: 100%;
        height: 45px;
        text-align: center;
        border-radius: 5px;
        margin: 0 2rem;
    }
`


const Sidebar: React.FunctionComponent = () => {
    const pathname = useLocation().pathname;

    const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
    const userService = container.get<IUserService>(SERVICE_KEYS.USER_SERVICE);
    var isAuthenticating = authService.userAuthenticated();
    var user = isAuthenticating ? authService.getUser() as UserToken : null;

    useEffect(() => {}, [isAuthenticating]);

    let isUsingSmallScreen = false;
    if ((window as Window).matchMedia) {
    isUsingSmallScreen = useMedia('(max-width: 768px)');
    }

    const [open, setopen] = useState(!isUsingSmallScreen)
    const toggleOpen = () => {
        setopen(!open)
    }

    const loginUser = () => {
        authService.login();
    }

    const logoutUser = () => {
        authService.logout();
    }

    const anonymizeUser = () => {
        var user = authService.getUser();
        toast((t) => (
            <span>
              Are you sure you want to anonymize the User '{user.name}'?
              <div
                style={{
                  marginLeft: "100px",
                  marginRight: "auto",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => {toast.dismiss(); callBackEnd(user.id);}}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    marginRight: "5px",
                    borderRadius: "5px",
                    borderWidth: "1px",
                    padding: "5px",
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => toast.dismiss()}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                    borderWidth: "1px",
                    padding: "5px",
                  }}
                >
                  No
                </button>
              </div>
            </span>
          ));
    }

    const callBackEnd = (id: string) => {
        userService
          .anonymize(id)
          .then((user) => {
            toast("User Anonymized Successfully!");
            authService.logout();
        })
          .catch((e: AxiosError) => {
            if (e.response?.status !== 500) {
              toast.error(
                "Invalid request: " +
                  JSON.stringify(((e.response as any).data as any).message)
              );
              return;
            }
            toast.error(
              `Location: anonymizeUser | Status: ${
                e.code
              } | Message: ${JSON.stringify(
                e?.response
              )} (Is the server running?)`
            );
          });
      };

    return (
        <>
            <Navbar className="navbartop">
                <MenuIconOpen to="#" onClick={toggleOpen}>
                    <FaIcons.FaBars />
                </MenuIconOpen>
                <span className="navbar-title">{SidebarData.find(item => pathname.toLocaleLowerCase() === item.path.toLocaleLowerCase())?.title}</span>
                    {
                        isAuthenticating ?
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' id="userDrop">
                                {user?.name}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" onClick={anonymizeUser}>Anonymize</Dropdown.Item>
                                    <Dropdown.Item href='#' onClick={logoutUser}>Log out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        :
                        <div className='userName' onClick={loginUser}> Login
                        </div>
                    }
            </Navbar>

            <div className={open?'sidenav':'sidenavClosed'}>

                {SidebarData.filter(item => item.roles.includes(user?.role ?? 0)).map(item =>{
                return  <NavLink key={item.path} className={'sideitem'} to={item.path}>
                            {item.icon}
                            <span className={'linkText'}>{item.title}</span>
                        </NavLink>
                })}
            </div>
        </>
    )
}

export default Sidebar