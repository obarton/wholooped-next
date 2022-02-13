export const GET_GENRE_SONG_IDS = (id: string) => `
query {
	genreCollection(where: {sys: {id: "${id}"}}) {
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