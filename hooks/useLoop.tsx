import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useLoop(loopmakerSlug: string, loopSlug: string) {
  const { data, error } = useSWR({apiName: "LoopApi", endpoint: `/loops/${loopmakerSlug}/${loopSlug}`}, amplifyApiFetcher)

  return {
    loop: data?.loop,
    songs: data?.songs,
    isLoading: !error && !data,
    isError: error
  }
}