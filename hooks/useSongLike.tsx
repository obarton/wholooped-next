import useSWR from "swr"
import { amplifyApiFetcher } from "../helper/fetcher"

interface SongLikeResponse {
    isLiked: boolean;
    isLoading: boolean;
    isError: boolean;
}

export function useSongLike(userId: string, itemId: string): SongLikeResponse {
  const { data, error } = useSWR({apiName: "LikesApi", endpoint: `/like/${userId}/${itemId}`}, amplifyApiFetcher)

  return {
    isLiked: data?.isLiked,
    isLoading: !error && !data,
    isError: error
  }
}