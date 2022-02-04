import { useUser } from "@auth0/nextjs-auth0"
import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useUserProfile () {
  const { user } = useUser()
  const { data, error } = useSWR({apiName: "UserProfileManagementApi", endpoint: `/userProfile/auth/${user?.sub as string}`}, amplifyApiFetcher)

  return {
    user,
    userProfile: data,
    isLoading: !error && !data,
    isError: error
  }
}