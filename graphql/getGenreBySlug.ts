export const GET_GENRE_BY_SLUG = (slug: string) => `
query {
      genreCollection(where:{slug: "${slug}"})  {
      items {
        sys {
            id
        }
        name
        slug
        coverImage {
          url
        }
      }
  }
}`