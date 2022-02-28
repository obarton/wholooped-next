import router from 'next/router'
import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import styled from "styled-components"
import { defaultDesktopMenuItems, desktopLoopmakerMenuItems } from '../helper/menu'
import { useUserProfile } from '../hooks/useUserProfile'
import Chip from '@mui/material/Chip';

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
    const { userProfile, isLoading, isError } = useUserProfile()
    const [menuItems, setMenuItems] = useState(defaultDesktopMenuItems(userProfile?.name));
    
    useEffect(() => {
      if(userProfile?.linkedLoopmaker) {
        setMenuItems(desktopLoopmakerMenuItems)
      } else {
        setMenuItems(defaultDesktopMenuItems(userProfile?.name))
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

                if (menuItem.title == "NFT" && userProfile?.id) {
                    if( userProfile?.id == 'aefa1b26-0d4b-41b3-9f03-39aad1a1e080' || userProfile?.id == '7efc8460-fb27-4f60-b74a-fb02586a2f66')
                    {
                        return (
                            <StyledLink href={url} key={menuItem.title}>
                                <MenuItem>{title} <Chip label="New" color="primary" size="small"/></MenuItem>
                            </StyledLink>
                        )
                    }
                    return <></>
                }

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
                    <SetupProfileButton onClick={() =>  router.push(`/profile/loopmaker/create`)}>Add Your Credits</SetupProfileButton>
                </div>
            )
        }
        </Container></div>
    )
}

export default Sidebar
