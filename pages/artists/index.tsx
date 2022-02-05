import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ContentfulApi, { getArtistIndex } from '../../lib/contentfulApi';
import { Config } from '../../utils/config';
import ArtistList from '../../components/ArtistList';

const ArtistIndex = ({ artists, currentPage, totalPages }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
        <ArtistList 
            artists={artists}
            currentPage={currentPage}
            totalPages={totalPages}
        />
    )
};


export const getStaticProps = async () => {
    const artists = await ContentfulApi.getPaginatedArtists(1);
    const totalPages = Math.ceil(artists.total / Config.pagination.pageSize);
  
    return {
      props: {
        artists: artists.items,
        totalPages,
        currentPage: 1,
      },
    };
}

export default ArtistIndex;
