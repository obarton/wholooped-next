import { useUser } from "@auth0/nextjs-auth0"
import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

export function useUserProfile () {
  const userData = useUser()
  const { data, error } = useSWR({apiName: "UserProfileManagementApi", endpoint: `/userProfile/auth/${userData?.user?.sub as string}`}, amplifyApiFetcher)

  return {
    user: userData.user,
    userProfile: data,
    isAuthenticated: !userData.isLoading && userData.user,
    isLoading: (!error && !data && userData.isLoading),
    isError: error
  }
}