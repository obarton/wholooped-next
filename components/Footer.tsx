import React from 'react'
import { SocialIcon } from 'react-social-icons';
import Stack from "react-bootstrap/Stack"
import "../styles/Footer.module.css"
import { Desktop, Mobile } from "./Responsive"
import NextLink from './NextLink';

const Footer = () => {
  return (
    <>
    <Desktop>
    <div className="footer-dark">
    <footer style={{ backgroundColor: "black" }}>
        <div className="container">
            <Stack direction="horizontal">
                <Stack gap={4} style={{width: "40%"}}>
                    <div>
                        <ul style={{color: "white", listStyleType: "none", margin: "0", padding: "0"}}>
                            <li><b>Music</b></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="/app" style={{color: "white"}}>Browse</NextLink></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="/artists" style={{color: "white"}}>Artists</NextLink></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="http://community.wholooped.com/" style={{color: "white"}}>Community</NextLink></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="/add-a-song" style={{color: "white"}}>Add A Song</NextLink></li>
                        </ul>
                    </div>
                </Stack>
                <Stack gap={4} style={{width: "40%"}}>
                    <div>
                        <ul style={{color: "white", listStyleType: "none", margin: "0", padding: "0"}}>
                            <li><b>About</b></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="/contact-us" style={{color: "white"}}>Contact Us</NextLink></li>
                        </ul>
                    </div>
                    <div>
                    <Stack direction="horizontal" gap={2}>
                        <SocialIcon fgColor="white" style={{ height: 25, width: 25 }} url="https://www.instagram.com/wholooped"/>
                        <SocialIcon fgColor="white" style={{ height: 25, width: 25 }} url="https://www.facebook.com/wholooped"/>
                        <SocialIcon fgColor="white" style={{ height: 25, width: 25 }} url="https://www.twitter.com/wholooped"/>
                        <SocialIcon fgColor="white" style={{ height: 25, width: 25 }} network="email" url="info@wholooped.com"/>
                    </Stack>
                    </div>
                </Stack>
            </Stack>
            <p className="copyright">Who Looped © 2022</p>
        </div>
    </footer>
</div>
</Desktop>
<Mobile>
<div className="footer-dark">
    <footer style={{ backgroundColor: "black" }}>
        <div className="container">
            <Stack direction="horizontal">
                <Stack gap={4} style={{width: "40%"}}>
                    <div>
                        <ul style={{color: "white", listStyleType: "none", margin: "0", padding: "0"}}>
                            <li><b>Music</b></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="/app" style={{color: "white"}}>Browse</NextLink></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="/artists" style={{color: "white"}}>Artists</NextLink></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="http://community.wholooped.com/" style={{color: "white"}}>Community</NextLink></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="/add-a-song" style={{color: "white"}}>Add A Song</NextLink></li>
                        </ul>
                    </div>
                </Stack>
                <Stack gap={4} style={{width: "40%"}}>
                    <div>
                        <ul style={{color: "white", listStyleType: "none", margin: "0", padding: "0"}}>
                            <li><b>About</b></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><NextLink to="/contact-us" style={{color: "white"}}>Contact Us</NextLink></li>
                        </ul>
                    </div>
                    <div>
                    <Stack direction="horizontal" gap={2}>
                        <SocialIcon fgColor="white" style={{ height: 25, width: 25 }} url="https://www.instagram.com/wholooped"/>
                        <SocialIcon fgColor="white" style={{ height: 25, width: 25 }} url="https://www.facebook.com/wholooped"/>
                        <SocialIcon fgColor="white" style={{ height: 25, width: 25 }} url="https://www.twitter.com/wholooped"/>
                        <SocialIcon fgColor="white" style={{ height: 25, width: 25 }} network="email" url="info@wholooped.com"/>
                    </Stack>
                    </div>
                </Stack>
            </Stack>
            <p className="copyright">Who Looped © 2022</p>
        </div>
    </footer>
</div>
</Mobile>
</>
);
};

export default Footer;
