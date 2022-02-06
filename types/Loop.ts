import Platform from "./Platform";
import LoopPack from "./LoopPack"

type Loop = {
    id: string
    title: string
    url: string
    releaseDate: string
    isActive: boolean
    loopmaker: any
    slug: string
    platform: Platform
    loopPack: LoopPack
    platformTrackId: string
}

export default Loop;