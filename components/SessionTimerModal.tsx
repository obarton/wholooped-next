import React from 'react'
import { useState } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useIdleTimer } from 'react-idle-timer'
import { Modal, Button } from 'react-bootstrap';
import NextLink from "../components/NextLink"

const SessionTimerModal = () => {
    const [show, setShow] = useState(false);
    const userProfileData = useUserProfile()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleOnIdle = (event: any) => {
      const totalActiveTime = getTotalActiveTime()
      console.log('user is idle', event)
      console.log('last active', getLastActiveTime())
      console.log('total active time', totalActiveTime)
      if(totalActiveTime > 10000 && !show && !userProfileData.user && !userProfileData.isLoading) {
        console.log(`ACTIVE TIME LIMIT REACHED`)
        handleShow()
      }
    }
  
    const handleOnActive = (event: any) => {
      const totalActiveTime = getTotalActiveTime()
  
      console.log('user is active', event)
      console.log('time remaining', getRemainingTime())
      console.log('total active time', totalActiveTime)
  
      if(totalActiveTime > 10000 && !show && !userProfileData) {
        console.log(`ACTIVE TIME LIMIT REACHED`)
        handleShow()
      }
    }
  
    const handleOnAction = (event: any) => {
      const totalActiveTime = getTotalActiveTime()
      console.log('user did something', event)
      console.log('total active time', totalActiveTime)
  
      if(totalActiveTime > 10000 && !show && !userProfileData) {
        console.log(`ACTIVE TIME LIMIT REACHED`)
        handleShow()
      }
    }
  
    const { getRemainingTime, getLastActiveTime, getTotalActiveTime } = useIdleTimer({
      timeout: 5000,
      onIdle: handleOnIdle,
      onActive: handleOnActive,
      onAction: handleOnAction,
      debounce: 500
    })
    

  return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header>
        <Modal.Title>Login to continue browsing.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Login or sign-up to continue browsing Who Looped!
        </Modal.Body>
        <Modal.Footer>
        <NextLink href="/api/auth/login">                   
            <Button variant="primary">Login</Button>
        </NextLink>
        <NextLink href="/api/auth/login">
            <Button variant="success">Sign Up</Button>
        </NextLink>
        </Modal.Footer>
    </Modal>
  )
}

export default SessionTimerModal