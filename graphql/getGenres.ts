export const GET_GENRES = `
query {
    genreCollection {
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