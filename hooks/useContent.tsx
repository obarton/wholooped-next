import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useContent() {
  const { data, error } = useSWR({apiName: "ContentApi", endpoint: `/content`}, amplifyApiFetcher)

  return {
    contentLists: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useSong(artistSlug: string, songSlug: string) {
  const { data, error } = useSWR({apiName: "SongApi", endpoint: `/songs/${artistSlug}/${songSlug}`}, amplifyApiFetcher)

  return {
    song: data,
    isLoading: !error && !data,
    isError: error
  }
}