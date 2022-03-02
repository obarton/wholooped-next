export const GET_FEATURED_LOOP_PACKS = `
query {
	loopPackCollection(limit: 6, where: {artwork_exists: true}) {
  	items {
      title
      slug
      artwork {
        url
      }
      loopmakerCollection {
      	items {
          name
          slug
        }
      }
    }
  }
}
`