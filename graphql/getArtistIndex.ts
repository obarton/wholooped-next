export const GET_ARTISTS_INDEX = `
query {
    artistCollection {
      items {
        name
        slug
        photo {
          url
        }
      }
    }
  }`