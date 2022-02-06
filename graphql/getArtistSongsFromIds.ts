export const GET_SONGS_FROM_SONG_IDS = (ids: string[]) => `
query {
	songCollection(where: {sys: {id_in: [${ids}]}}){
    items {
      sys {
        id
      }
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