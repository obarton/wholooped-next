import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useAccount(userId: string) {
    const { data, error } = useSWR({apiName: "AccountApi", endpoint: `/account/${userId}`}, amplifyApiFetcher)
  
    return {
      account: data,
      isLoading: !error && !data,
      isError: error
    }
  }