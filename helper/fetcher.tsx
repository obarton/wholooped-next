import { API } from "aws-amplify";

export const fetcher = (...args: any) => fetch.apply(null, args).then(res => res.json())

export const amplifyApiFetcher = (args: any) => {
    const { apiName, endpoint } = args;
    return API.get(apiName, endpoint, {})
}