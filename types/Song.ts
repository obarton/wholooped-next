import Artist from "./Artist"
import Album from "./Album"
import Loop from "./Loop"
import Platform from "./Platform"

type Song = {
    id: string
    contentful_id: string
    title: string
    url: string
    loopStartTimeSeconds: number
    isActive: boolean
    slug: string
    isFeatured: boolean
    platform: Platform
    artist: Artist[]
    album: Album
    loop: Loop[]
    isLiked?: boolean
    likesCount: number
}

export default Song;