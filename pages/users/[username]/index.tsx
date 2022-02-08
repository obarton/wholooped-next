import { useRouter } from "next/router";
import React from "react"
import PageContainer, { MobilePageContainer } from "../../../components/PageContainer";
import { Desktop, Mobile } from "../../../components/Responsive";
import Spinner from "../../../components/Spinner";
import { useUsers } from "../../../hooks/useUsers";
import { useUserProfile } from "../../../hooks/useUserProfile";
import UserProfileCard from "../../../components/UserProfileCard";
import CreditsList from "../../../components/CreditsList";
import HorizontalDivider from "../../../components/HorizontalDivider";

const User = () => {
  const router = useRouter()
  const { username } = router.query
  const { user, isLoading, isError} = useUsers(username as string)
  const loggedInUserProfile = useUserProfile();

  if (isError) return <div>Failed to load</div>
  if (isLoading || loggedInUserProfile.isLoading ) return <Spinner />

    return (
      <>
        <Desktop>
          <PageContainer>
                <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                    <UserProfileCard 
                        avatarSrc={user?.profile?.photo.url}
                        displayName={user?.profile?.displayName}
                        username={username as string}
                        bio={user?.profile?.bio}
                        canEdit={loggedInUserProfile.userProfile?.name === username}
                        // websiteUrl={websiteUrl}
                        uploads={user?.contributions}
                        // twitterUrl={twitterUrl}
                        // instagramUrl={instagramUrl}
                        // facebookUrl={facebookUrl}
                    />
                </div>
              <div>
                <HorizontalDivider />
              </div>
              <div style={{marginTop: "2rem"}}>
                <h3 style={{textAlign: "center"}}>Uploads</h3>
                <div style={{marginTop: "1rem"}}>
                  <CreditsList credits={user?.contributions}/>
                </div>
              </div>
          </PageContainer>
        </Desktop>
        <Mobile>
          <MobilePageContainer>
                <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                    <UserProfileCard 
                        avatarSrc={user?.profile?.photo.url}
                        displayName={user?.profile?.displayName}
                        username={username as string}
                        bio={user?.profile?.bio}
                        uploads={user?.contributions}
                        canEdit={loggedInUserProfile.userProfile?.name === username}
                    />
                </div>
              <div>
                <HorizontalDivider />
              </div>
              <div style={{marginTop: "2rem"}}>
                <h3 style={{textAlign: "center"}}>Uploads</h3>
                <div style={{marginTop: "1rem", paddingLeft: "5%", paddingRight: "5%"}}>
                  <CreditsList credits={user?.contributions}/>
                </div>
              </div>
          </MobilePageContainer>
        </Mobile>
      </>
    )
}

export default User;
