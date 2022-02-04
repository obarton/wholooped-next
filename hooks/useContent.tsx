import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useContent () {
  const { data, error } = useSWR({apiName: "ContentApi", endpoint: `/content`}, amplifyApiFetcher)

  return {
    contentLists: data,
    isLoading: !error && !data,
    isError: error
  }
}