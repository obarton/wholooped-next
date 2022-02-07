import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useLoopmakerCredits(loopmakerId: string) {
    const { data, error } = useSWR({apiName: "LoopmakerApi", endpoint: `/loopmaker/${loopmakerId}/credits`}, amplifyApiFetcher)
  
    return {
      credits: data,
      isLoading: !error && !data,
      isError: error
    }
  }