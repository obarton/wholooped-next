export const GET_LOOPMAKER_BY_SLUG = (slug: string) => `
query {
    loopmakerCollection(where:{slug: "${slug}"}) {
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
}`