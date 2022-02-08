import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useLoopPack(loopmakerSlug: string, loopPackSlug: string) {
  const { data, error } = useSWR({apiName: "LoopPackApi", endpoint: `/looppacks/${loopmakerSlug}/${loopPackSlug}`}, amplifyApiFetcher)
    console.log(`useLoopPack error ${JSON.stringify(error, null, 2)}`);
    
  return {
    loopPack: data?.loopPack,
    songs: data?.songs,
    isLoading: !error && !data,
    isError: error
  }
}