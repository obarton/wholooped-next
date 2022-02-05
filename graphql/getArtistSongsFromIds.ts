export const GET_ARTIST_SONGS_FROM_IDS = (ids: string[]) => `
query {
	songCollection(where: {sys: {id_in: [${ids}]}}){
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