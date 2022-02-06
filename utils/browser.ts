export const getBrowserWindowUrl = (): string => {
    const isBrowser = typeof window !== "undefined"

    if (!isBrowser) {
      return "";
    }
  
    return window.location.href
}