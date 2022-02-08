import React, { useState } from 'react';
import { Desktop, Mobile } from "./Responsive"
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar  from "react-bootstrap/Navbar"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Stack from 'react-bootstrap/Stack'
import Avatar from "./Avatar"
import styled from "styled-components"
import { useFormik } from "formik"
import { useRouter } from 'next/router'
import Offcanvas from "react-bootstrap/Offcanvas"
import { defaultMobileMenuItems, mobileLoopmakerMenuItems } from '../helper/menu';
import { useUserProfile } from '../hooks/useUserProfile';
import AddSongModal from './AddSongModal';

const StyledLink = styled.a`
    color: black;
    text-decoration: none
`

const NavBar = () => {
    const { user, userProfile } = useUserProfile();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
        searchText: ''
        },
        onSubmit: (values) => {
            const { searchText } = values;
            router.push(`/search?searchText=${searchText}`)
        },
      })
    const [showAddCreditModal, setShowAddCreditModal] = useState(false);
    const handleCloseAddCreditModal = () => setShowAddCreditModal(false);
    const handleShowAddCreditModal = () => setShowAddCreditModal(true);

    return (
        <>
            <Desktop>
                <Navbar expand="lg" style={{boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)"}}>
                <Container fluid style={{padding: "1em"}}>
                <StyledLink href={user ? "/app" : "/"}><Navbar.Brand className="header-logo">Who Looped <span style={{color:"#198754", fontSize: "0.75em"}}><b><em>Beta</em></b></span></Navbar.Brand></StyledLink>
                <div className="vr" style={{marginRight: "1rem" }}/>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Stack direction="horizontal" gap={4}>
                            <StyledLink href="/app/">Browse</StyledLink>
                            <StyledLink href="/artists">Artists</StyledLink>
                            <StyledLink onClick={() => setShowAddCreditModal(true)}>Add A Song</StyledLink>
                            <StyledLink href="http://community.wholooped.com">Community</StyledLink>
                        </Stack>
                    </Nav>
                    <Stack direction="horizontal" gap={2}>
                        <Form className="d-flex" onSubmit={formik.handleSubmit}>
                            <FormControl
                                id="searchText"
                                name="searchText"
                                type="search"
                                placeholder="Search for Track, Loop, Artist, Loopmaker"
                                className="me-2"
                                aria-label="Search"
                                value={formik.values.searchText}
                                onChange={formik.handleChange}
                                style={{borderRadius: "0"}}
                            />
                            <Button variant="success" type="submit">Search</Button>
                        </Form>
                        <div className="vr" style={{marginLeft: "0.5rem", marginRight: "0.5rem"}}/>
                        {!user && <StyledLink href="/api/auth/login">Login</StyledLink> }
                        {!user && <StyledLink href="/api/auth/login">Sign Up</StyledLink> }
                        {
                            user ? 
                        (
                            <Avatar />
                        )
                        : 
                        (
                            <></>
                        )}
                        {user && <StyledLink href="/api/auth/logout">Logout</StyledLink>}
                    </Stack>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
                <AddSongModal 
                    show={showAddCreditModal} 
                    onHide={handleCloseAddCreditModal} 
                    />
            </Desktop>
            <Mobile>
            <Navbar expand={false}>
                <Container fluid>
                <StyledLink href={user ? "/app" : "/"}><Navbar.Brand className="header-logo">Who Looped <span style={{color:"#198754", fontSize: "0.75em"}}><b><em>Beta</em></b></span></Navbar.Brand></StyledLink>
                <Navbar.Toggle aria-controls="offcanvasNavbar" style={{border: "0"}}></Navbar.Toggle>
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontSize: "1.5em"}} className="header-logo">Who Looped <span style={{color:"#198754", fontSize: "0.75em"}}><b><em>Beta</em></b></span></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Stack gap={3}>
                    <div>
                    {userProfile && (
                            <> 
                            <Avatar />
                            <p style={{marginTop: "0.5em"}}>Signed in as <b>{userProfile.displayName}</b></p>
                            </>
                    )}
                    </div>
                    <div style={{marginTop: "1em", marginBottom: "1em"}}>
                    <Nav>
                        <Stack gap={4}>
                        { user ? (
                                    defaultMobileMenuItems.map((menuItem: any) => {
                                        return (
                                        <StyledLink href={menuItem.url} key={menuItem.title}>{menuItem.title}</StyledLink>
                                        )
                                    }
                                )) 
                                : 
                                (
                                    defaultMobileMenuItems.filter((i: any) => i.authRequired == false).map((menuItem: any) => {
                                        return (
                                        <StyledLink href={menuItem.url}  key={menuItem.title}>{menuItem.title}</StyledLink>
                                        )
                                    }
                                )
                                )
                            }
                        </Stack>
                    </Nav>
                    </div>
                    <div>
                    <Form className="d-flex" onSubmit={formik.handleSubmit}>
                            <FormControl
                                id="searchText"
                                name="searchText"
                                type="search"
                                placeholder="Search for Track, Loop, Artist, Album"
                                className="me-2"
                                aria-label="Search"
                                value={formik.values.searchText}
                                onChange={formik.handleChange}
                                style={{borderRadius: "0"}}
                            />
                            <Button variant="success" type="submit">Search</Button>
                        </Form>
                    </div>  
                    <div>
                        <div style={{padding: "0.5em"}}>
                        <hr className="solid" style={{ margin: "auto", color: "#FFD000"}}/>
                        </div>
                        <Stack gap={4}>
                        {!user && <StyledLink href="/api/auth/login">Login</StyledLink> }
                        {!user && <StyledLink href="/api/auth/login">Sign Up</StyledLink> }
                        </Stack>
                    </div> 
                        <div>
                        {user && <StyledLink href="/api/auth/logout">Logout</StyledLink>}
                        </div>
                        </Stack>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                </Container>
            </Navbar>
            </Mobile>
        </>
    )
};

export default NavBar;
