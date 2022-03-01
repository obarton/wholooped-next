import React from 'react'
import { useState, useEffect } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useIdleTimer } from 'react-idle-timer'
import { Modal, Button } from 'react-bootstrap';
import NextLink from "../components/NextLink"

const SessionTimerModal = () => {
    const [show, setShow] = useState(false);
    const [browseLimitReached, setBrowseLimitReached] = useState(false)
    const userProfileData = useUserProfile()

    const handleClose = () =>  {
        setShow(false)
    };
    
    const handleShow = () => {
        setShow(true)
        setBrowseLimitReached(true)
    };

    useEffect(() => {
        //setBrowseLimitReached(JSON.parse(window.localStorage.getItem('browseLimitExpiration') as string));
        const browseLimitExpiration = window.localStorage.getItem('browseLimitExpiration')
        console.log(`browseLimitExpiration ${browseLimitExpiration}`)
        if(browseLimitExpiration)
        {
            console.log(`browseLimitExpiration detected: ${browseLimitExpiration}`)

            const currentDate = new Date();
            const browseLimitExpirationDate = new Date(Date.parse(browseLimitExpiration));

            console.log(`currentDate ${currentDate}`)
            console.log(`browseLimitExpirationDate ${browseLimitExpirationDate}`)

            if(currentDate < browseLimitExpirationDate) {
                console.log(`browse limit not yet expired`)
                setBrowseLimitReached(true)
                return
            }

            console.log(`browse limit has expired`)
        } else {
            console.log(`browse limit not yet set`)
        }
      }, []);

    useEffect(() => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0,0,0,0)

        if(browseLimitReached) {
            window.localStorage.setItem('browseLimitExpiration', tomorrow?.toString());
        }     
    }, [browseLimitReached]);
    
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
        Login or create a free account to continue browsing Who Looped!
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