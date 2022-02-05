export const GET_ARTIST_SONG_IDS = (id: string) => `
query {
	artistCollection(where: {sys: {id: "${id}"}}) {
    items {
      linkedFrom {
        songCollection {
          items {
            sys {
              id
            }
          }
        }
      }
    }
  }
}`