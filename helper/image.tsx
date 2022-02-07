export const resizeImageFromUrl = (url: string, size: string = "m") => {
    switch (size) {
        case "m":
            return url ? `${url}?w=100&h=100&fm=png&q=100&fit=thumb` : url;
        case "l":
            return url ? `${url}?w=175&h=175&fm=png&q=100&fit=thumb` : url;
        default:
            break;
    }

    return url ? `${url}?w=100&h=100&fm=png&q=100&fit=thumb` : url;
}