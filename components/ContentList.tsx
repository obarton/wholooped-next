import React from 'react';
import UserAlbumCard from "./UserAlbumCard";
import Link from "next/link"
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";;
import Carousel from 'react-multi-carousel';
import { responsive } from "../helper/carousel";
import { Desktop, Mobile } from './Responsive';
import SmallUserAlbumCard from './SmallUserAlbumCard';
import SmallAlbumCard from './SmallAlbumCard';
import NextLink from './NextLink';

interface ContentListProps {
    contentList: any,
    key: string
}

const ContentList = ({ contentList, key }: ContentListProps) => {
    const { items } = contentList;

  return (
      <>
        <Desktop>
            <div key={key}>
            {
                contentList.showMoreLink ? (
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <h3 style={{padding: "0", margin: "0"}}>
                                {contentList.title}
                            </h3>
                                <Link href={contentList.showMoreLink || ""} passHref>
                                    <a style={{textDecoration: "none"}}>
                                        <h4 style={{padding: "0", margin: "0", color: "black", fontWeight: "500", fontSize: "1.25rem"}}>Show More &#8594;</h4>
                                    </a>
                                </Link>
                        </div>
                        {contentList.description && contentList.description !== "" && <h5 style={{color: "#666C7E", fontWeight: "400"}}>{contentList.description}</h5> }
                    </div>
                ):(
                    <div>
                        <div style={{display: "flex"}}>
                            <h3 style={{padding: "0", margin: "0"}}>{contentList.title}</h3>
                        </div>
                        {contentList.description && contentList.description !== "" && <h5 style={{color: "#666C7E", fontWeight: "400"}}>{contentList.description}</h5> }
                    </div>
                )
            }
                <Carousel responsive={responsive} infinite={true}>
                {items.map((item: any) => {
                    const {
                        title, 
                        subTitle, 
                        thumbnailUrl, 
                        userIcon,
                        username,
                        userDisplayName,
                        userUrl,
                        url
                        } = item;

                    const imageSrc = thumbnailUrl? `${thumbnailUrl}?w=125&h=125&fm=png&q=100&fit=thumb` : "";
                    
                    switch(contentList.type) {
                        case "song":
                            return (                                              
                            <UserAlbumCard 
                                albumUrl={imageSrc} 
                                url={url}
                                title={title} 
                                secondaryText={subTitle} 
                                imageSrc={imageSrc} 
                                altText={title} 
                                userUrl={userUrl}
                                userThumbnailUrl={userIcon}
                                userDisplayName={userDisplayName}
                                username={username}/>        
                            )
                        case "looppack":
                        case "genre":
                        case "loop":
                            return (
                            <AlbumCard title={title} secondaryText={subTitle} imageSrc={imageSrc} altText={title} url={url}/>
                            )
                        case "artist":
                        case "loopmaker":
                            return (
                            <ArtistCard title={title} imageSrc={imageSrc} altText={title} url={url}/>
                            )
                        default:
                            return
                        }
                    
                })}
                </Carousel>
            </div>
        </Desktop>
        <Mobile>
            <div key={key}>
            <div style={{marginBottom: "1rem"}}>
            {
                contentList.showMoreLink ? 
                (
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <h3 style={{padding: "0", margin: "0"}}>{contentList.title}</h3><Link href={contentList.showMoreLink} passHref><a style={{textDecoration: "none", display: "flex", justifyContent: "center", alignItems: "center"}}><h4 style={{padding: "0", margin: "0", color: "#4183c4", fontSize: "1rem"}}>Show More</h4></a></Link>
                        </div>
                        {contentList.description && contentList.description !== "" && <h5 style={{color: "#666C7E", fontWeight: "400"}}>{contentList.description}</h5> }
                    </div>
                )
                :
                (
                    <div>
                        <div style={{display: "flex"}}>
                            <h3 style={{padding: "0", margin: "0"}}>{contentList.title}</h3>
                        </div>
                        {contentList.description && contentList.description !== "" && <h5 style={{color: "#666C7E", fontWeight: "400"}}>{contentList.description}</h5> }
                    </div>
                )
            }
            </div>
                <Carousel responsive={responsive} infinite={true}>
                {items.map((item: any) => {
                    const {
                        title, 
                        subTitle, 
                        thumbnailUrl, 
                        userIcon,
                        username,
                        userDisplayName,
                        userUrl,
                        url
                        } = item;

                    const imageSrc = thumbnailUrl? `${thumbnailUrl}?w=100&h=100&fm=png&q=100&fit=thumb` : "";
                    
                    switch(contentList.type) {
                        case "song":
                            return (                                              
                            <SmallUserAlbumCard 
                                albumUrl={imageSrc} 
                                url={url}
                                title={title} 
                                secondaryText={subTitle} 
                                imageSrc={imageSrc} 
                                altText={title} 
                                userUrl={userUrl}
                                userThumbnailUrl={userIcon}
                                userDisplayName={userDisplayName}
                                username={username}/>        
                            )
                        case "looppack":
                        case "genre":
                            return (
                            <SmallAlbumCard title={title} secondaryText={subTitle} imageSrc={imageSrc} altText={title} url={url}/>
                            )
                        case "artist":
                        case "loopmaker":
                            return (
                            <ArtistCard title={title} imageSrc={imageSrc} altText={title} url={url}/>
                            )
                        default:
                            return
                        }
                    
                })}
                </Carousel>
            </div>
        </Mobile>
    </>
  )
};

export default ContentList;
