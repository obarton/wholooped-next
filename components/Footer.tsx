import React from 'react'
import { SocialIcon } from 'react-social-icons';
import Stack from "react-bootstrap/Stack"
import "../styles/Footer.module.css"
import { Desktop, Mobile } from "./Responsive"
import { LightNextLink } from './NextLink';

const Footer = () => {
  return (
    <>
    <Desktop>
    <div className="footer-dark" >
    <footer style={{ backgroundColor: "black", padding: "2rem" }}>
        <div className="container">
            <Stack direction="horizontal">
                <Stack gap={4} style={{width: "40%"}}>
                    <div>
                        <ul style={{color: "white", listStyleType: "none", margin: "0", padding: "0"}}>
                            <li><b>Music</b></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="/app" style={{color: "white"}}>Browse</LightNextLink></li>
                            {/* <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="/artists" style={{color: "white"}}>Artists</LightNextLink></li> */}
                            <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="http://community.wholooped.com/" style={{color: "white"}}>Community</LightNextLink></li>
                            {/* <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="/app" style={{color: "white"}}>Add A Song</LightNextLink></li> */}
                        </ul>
                    </div>
                </Stack>
                <Stack gap={4} style={{width: "40%"}}>
                    <div>
                        <ul style={{color: "white", listStyleType: "none", margin: "0", padding: "0"}}>
                            <li><b>About</b></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="/contact-us" style={{color: "white"}}>Contact Us</LightNextLink></li>
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
            <div style={{ marginTop: "1rem"}}>
                <p className="copyright" style={{margin: "0", padding: "0", color: "white"}}>Who Looped © 2022</p>
            </div>
        </div>
    </footer>
</div>
</Desktop>
<Mobile>
<div className="footer-dark">
    <footer style={{ backgroundColor: "black", padding: "2rem" }}>
        <div className="container">
            <Stack direction="horizontal">
                <Stack gap={4} style={{width: "40%"}}>
                    <div>
                        <ul style={{color: "white", listStyleType: "none", margin: "0", padding: "0"}}>
                            <li><b>Music</b></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="/app" style={{color: "white"}}>Browse</LightNextLink></li>
                            {/* <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="/artists" style={{color: "white"}}>Artists</LightNextLink></li> */}
                            <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="http://community.wholooped.com/" style={{color: "white"}}>Community</LightNextLink></li>
                            {/* <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="/app" style={{color: "white"}}>Add A Song</LightNextLink></li> */}
                        </ul>
                    </div>
                </Stack>
                <Stack gap={4} style={{width: "40%"}}>
                    <div>
                        <ul style={{color: "white", listStyleType: "none", margin: "0", padding: "0"}}>
                            <li><b>About</b></li>
                            <li style={{marginBottom: "0.25em", padding: "0"}}><LightNextLink href="/contact-us" style={{color: "white"}}>Contact Us</LightNextLink></li>
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
            <div style={{ marginTop: "1rem"}}>
            <p className="copyright" style={{margin: "0", padding: "0", color: "white"}}>Who Looped © 2022</p>
            </div>
        </div>
    </footer>
</div>
</Mobile>
</>
);
};

export default Footer;
