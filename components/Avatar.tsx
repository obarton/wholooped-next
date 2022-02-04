import { useUser } from "@auth0/nextjs-auth0"
import { Avatar as MuiAvatar } from "@mui/material"
import { useUserProfile } from "../hooks/useUserProfile"
import Spinner from "./Spinner"

export default function Avatar () {
    const { userProfile, isLoading, isError, user } = useUserProfile()

    const getImgSrc = (): string => {
        return (userProfile?.photo ? `${userProfile?.photo.url}?w=175&h=175&fm=png&q=100&fit=thumb` : user?.picture) as string
    }

    if (isLoading) return <Spinner />
    if (isError) return <MuiAvatar sx={{width: 36, height: 36 }} src={""} />

    return <MuiAvatar sx={{width: 36, height: 36 }} src={getImgSrc()} />
}