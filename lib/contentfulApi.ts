import { GET_ARTISTS_INDEX } from "../graphql/getArtistIndex"
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

export async function getArtistIndex() {
    const response = await fetchGraphQL(GET_ARTISTS_INDEX)

    return response?.data?.artistCollection?.items;
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
}