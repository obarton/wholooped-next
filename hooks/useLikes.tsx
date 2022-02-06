import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useLikes(userId: string) {
    const { data, error } = useSWR({apiName: "LikesApi", endpoint: `/likes/${userId}`}, amplifyApiFetcher)
  
    return {
      likes: data,
      isLoading: !error && !data,
      isError: error
    }
  }