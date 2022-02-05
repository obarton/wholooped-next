export const resizeImageFromUrl = (url: string) => {
    return url ? `${url}?w=125&h=125&fm=png&q=100&fit=thumb` : url;
}