export const GET_FEATURED_SONGS = `
query {
	songCollection(where: {isFeatured: true}) {
    items {
      title
      slug
      artistCollection {
        items {
          name
          slug
        }
      }
      album {
        artwork {
          url
        }
      }
    }
  }
}
`