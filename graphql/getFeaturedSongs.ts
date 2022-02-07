export const GET_FEATURED_SONGS = `
query {
	songCollection(where: {isFeatured: true}) {
    items {
      title
      artistCollection {
        items {
          name
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