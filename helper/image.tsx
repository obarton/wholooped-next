export const resizeImageFromUrl = (url: string) => {
    return url ? `${url}?w=100&h=100&fm=png&q=100&fit=thumb` : url;
}