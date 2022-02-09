import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useSong(artistSlug: string, songSlug: string) {
  const { data, error } = useSWR({apiName: "SongApi", endpoint: `/songs/${artistSlug}/${songSlug}`}, amplifyApiFetcher)

  return {
    song: data,
    isLoading: !error && !data,
    isError: error
  }
}