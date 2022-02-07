import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useSearch(searchText: string) {
    const { data, error } = useSWR({apiName: "SearchApi", endpoint:`/search/${searchText}`}, amplifyApiFetcher)
  
    return {
      results: data,
      isLoading: !error && !data,
      isError: error
    }
  }