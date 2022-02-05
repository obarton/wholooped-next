export const GET_ARTIST_BY_SLUG = (slug: string) => `
query {
      artistCollection(where:{slug: "${slug}"})  {
      items {
        sys {
            id
        }
        name
        slug
        photo {
          url
        }
      }
  }
}`