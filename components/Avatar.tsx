import { Avatar as MuiAvatar } from "@mui/material"
import { useUserProfile } from "../hooks/useUserProfile"

export default function Avatar () {
    const { userProfile, isLoading, isError, user } = useUserProfile()

    const getImgSrc = (): string => {
        return (userProfile?.photo ? `${userProfile?.photo.url}?w=175&h=175&fm=png&q=100&fit=thumb` : user?.picture) as string
    }

    if (isLoading) return <MuiAvatar sx={{width: 36, height: 36 }} src={""} />
    if (isError) return <MuiAvatar sx={{width: 36, height: 36 }} src={""} />

    return <MuiAvatar sx={{width: 36, height: 36 }} src={getImgSrc()} />
}