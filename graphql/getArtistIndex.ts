export const GET_ARTISTS = `
query {
    artistCollection {
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