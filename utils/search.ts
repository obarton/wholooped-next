export const mapSearchTypeName = (type: string) => {
    switch (type) {
        case "artist":
            return "Artist"
        case "song":
            return "Song"
        case "user":
            return "User"
        case "loopPack":
            return "Loop Pack"
        case "loopmaker":
            return "Loopmaker"
        case "album":
            return "Album"
        case "producer":
            return "Producer"
        default:
            break;
    }
}