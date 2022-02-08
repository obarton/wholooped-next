import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useUsers(username: string) {
    const { data, error } = useSWR({apiName: "UsersApi", endpoint: `/users/${username}`}, amplifyApiFetcher)
  
    return {
      user: data,
      isLoading: !error && !data,
      isError: error
    }
  }