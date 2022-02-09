import { GET_ARTIST_BY_SLUG } from "../graphql/getArtistBySlug"
import { GET_ARTISTS } from "../graphql/getArtistIndex";
import { GET_ARTIST_SONG_IDS } from "../graphql/getArtistSongIds";
import { GET_SONGS_FROM_SONG_IDS } from "../graphql/getArtistSongsFromIds";
import { GET_ARTISTS_SONG_IDS } from "../graphql/getArtistsSongIds";
import { GET_FEATURED_LOOP_PACKS } from "../graphql/getFeaturedLoopPacks";
import { GET_FEATURED_SONGS } from "../graphql/getFeaturedSongs";
import { GET_LOOPMAKER_BY_SLUG } from "../graphql/getLoopmakerBySlug";
import { GET_LOOPMAKERS } from "../graphql/getLoopmakerIndex";
import { Config } from "../utils/config";


async function fetchGraphQL(query: string, preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.CONTENTFUL_CDA_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
        }
    ).then((response) => response.json())
}

export async function getFeaturedLoopPacks() {
  const query = GET_FEATURED_LOOP_PACKS;
  const response = await fetchGraphQL(query);

  return response?.data?.loopPackCollection?.items;
}

export async function getFeaturedSongs() {
  const query = GET_FEATURED_SONGS;
  const response = await fetchGraphQL(query);

  return response?.data?.songCollection?.items;
}

export async function getArtistBySlug(slug: string) {
    const query = GET_ARTIST_BY_SLUG(slug)
    const response = await fetchGraphQL(query);

    return response?.data?.artistCollection?.items[0];
}

export async function getArtists() {
  const query = GET_ARTISTS;
  const response = await fetchGraphQL(query);

  return response?.data?.artistCollection?.items;
}

export async function getLoopmakers() {
  const query = GET_LOOPMAKERS;
  const response = await fetchGraphQL(query);

  return response?.data?.loopmakerCollection?.items;
}

export async function getArtistSongsIds(id: string) {
  const query = GET_ARTIST_SONG_IDS(id);
  const response = await fetchGraphQL(query);
  const songIds = response?.data?.artistCollection?.items[0]?.linkedFrom?.songCollection?.items?.map((item: any) => item?.sys?.id);

  return songIds;
}

export async function getArtistsSongsIds(ids: string[]) {
  const query = GET_ARTISTS_SONG_IDS(ids);
  const response = await fetchGraphQL(query);
  const songs = response?.data?.artistCollection?.items;

  return songs;
}

export async function getArtistSongs(id: string) {
  const artistSongIds = await getArtistSongsIds(id);
  const formattedSongIds = artistSongIds?.map((id: string) => `"${id}"`).join(",")
  const query = GET_SONGS_FROM_SONG_IDS(formattedSongIds);

  
  const response = await fetchGraphQL(query);

  return response?.data?.songCollection?.items;
}

export async function getArtistsSongs(ids: string[]) {
  const artistSongIds = await getArtistsSongsIds(ids);
  const formattedSongIds = artistSongIds?.map((id: string) => `"${id}"`).join(",")
  const query = GET_SONGS_FROM_SONG_IDS(formattedSongIds);

  const response = await fetchGraphQL(query);

  return response?.data?.songCollection?.items;
}

export async function getLoopmakerBySlug(slug: string) {
  const query = GET_LOOPMAKER_BY_SLUG(slug)
  const response = await fetchGraphQL(query);

  return response?.data?.loopmakerCollection?.items[0];
}

export async function getLoopmakerLoopPackIds(loopmakerId: string) {
  const query = GET_LOOPMAKER_BY_SLUG(loopmakerId)
  const response = await fetchGraphQL(query);

  return response?.data?.loopmakerCollection?.items[0];
}


export default class ContentfulApi {

  static async callContentful(query: string) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_CDA_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json(),
      );
      return data;
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }

  static async getTotalArtistsNumber() {
    // Build the query
    const query = `
      {
        artistCollection {
          total
        }
      }
    `;

    // Call out to the API
    const response = await this.callContentful(query);
    const totalArtists = response.data.artistCollection.total
      ? response.data.artistCollection.total
      : 0;

    return totalArtists;
  }

  static async getPaginatedArtists(page: any) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        artistCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: name_ASC) {
            total
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
        }`;

    // Call out to the API
    const response = await this.callContentful(query);

    const paginatedArtists = response.data.artistCollection
      ? response.data.artistCollection
      : { total: 0, items: [] };

    return paginatedArtists;
  }

  static async getTotalLoopPacksCount() {
    // Build the query
    const query = `
      {
        loopPackCollection {
          total
        }
      }
    `;

    // Call out to the API
    const response = await this.callContentful(query);
    const totalLoopPacks = response.data.loopPackCollection.total
      ? response.data.loopPackCollection.total
      : 0;

    return totalLoopPacks;
  }

  static async getPaginatedLoopPacks(page: any) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
          loopPackCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: title_ASC) {
            total
            items {
              sys {
                id
              }
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
    }`;

    // Call out to the API
    const response = await this.callContentful(query);

    const paginatedLoopPacks = response.data.loopPackCollection
      ? response.data.loopPackCollection
      : { total: 0, items: [] };

    return paginatedLoopPacks;
  }

  static async getTotalArtistSongs(artistId: string) {
    const query =`{
      artistCollection(where: {sys: {id: "${artistId}"}}) {
        items {
          linkedFrom {
            songCollection {
              total
            }
          }
        }
      }
    }`

        // Call out to the API
        const response = await this.callContentful(query);
        const totalArtistSongs = response.data.artistCollection?.items[0]?.linkedFrom?.songCollection?.total
          ? response.data.artistCollection?.items[0]?.linkedFrom?.songCollection?.total
          : 0;
    
        return totalArtistSongs;
  }

  static async getPaginatedArtistSongs(artistId: string, page: any) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

      const query =`{
        artistCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, where: {sys: {id: "${artistId}"}}) {
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

        // Call out to the API
        const response = await this.callContentful(query);

        const paginatedSongIds = response.data?.artistCollection?.items[0]?.linkedFrom?.songCollection
          ? response.data?.artistCollection?.items[0]?.linkedFrom?.songCollection
          : { total: 0, items: [] };
    
        return paginatedSongIds;
  }

  static async getGenres() {
    const query = `{
      genreCollection {
         items {
          name
          coverImage {
            url
          }
          slug
        }
      }
    }
    `

    // Call out to the API
    const response = await this.callContentful(query);

    return response?.data?.genreCollection;
  }
}