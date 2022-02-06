import router from 'next/router'
import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import styled from "styled-components"
import { defaultDesktopMenuItems, desktopLoopmakerMenuItems } from '../helper/menu'
import { useUserProfile } from '../hooks/useUserProfile'

const SetupProfileButton = styled.button`
    height: 40px;
    width: 150px;
    border: none;
    background-color: #FFD000;
    color: black;
    font-size: 15px
`

const StyledLink = styled.a`
    color: black;
    text-decoration: none
`

const MenuItem = styled.li({fontSize: "24px", marginBottom: "10px"})

const Sidebar = () => {
    const [menuItems, setMenuItems] = useState(defaultDesktopMenuItems);
    const { userProfile, isLoading, isError } = useUserProfile()

    useEffect(() => {
      if(userProfile?.linkedLoopmaker) {
        setMenuItems(desktopLoopmakerMenuItems)
      }
    }, [userProfile]);

    if(isLoading) {
        return <></>
    }

    return (
        <div id="sidebar-content">
        <Container style={{paddingTop: "86px", paddingLeft: "5%"}}><Stack gap={2}>
          <ul style={{lineHeight: "25.6px", listStyleType: "none", color: "black"}}>
            {menuItems.map(menuItem => {
                const { title, url } = menuItem;

                return(
                    <StyledLink href={url} key={menuItem.title}>
                        <MenuItem>{title}</MenuItem>
                    </StyledLink>
                )
            })}
          </ul>
        </Stack>
        { 
            (userProfile && userProfile?.linkedLoopmaker == null) && 
            (
                <div style={{textAlign: "center", marginTop: "1em"}}>
                    <p><b>Are you a loopmaker?</b></p>
                    <SetupProfileButton onClick={() =>  router.push(`/app/profile/loopmaker/create`)}>Add Your Credits</SetupProfileButton>
                </div>
            )
        }
        </Container></div>
    )
}

export default Sidebar
