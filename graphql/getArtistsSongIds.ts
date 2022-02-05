export const GET_ARTISTS_SONG_IDS = (ids: string[]) => `
query {
	artistCollection(where: {sys: {id_in: [${ids.map((id: string) => `"${id}"`).join(", ")}]}}) {
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