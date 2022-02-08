export const GET_LOOPMAKERS = `
query {
    loopmakerCollection {
      items	{
        sys {
          id
        }
        headerPhoto {
          url
        }
        profilePhoto {
          url
        }
        username
        name
        bio
        slug
        websiteUrl
        twitterUrl
        instagramUrl
      }
    }
}
`