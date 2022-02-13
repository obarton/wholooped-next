import React from 'react';
import { useRouter } from 'next/router';
import { getArtists, getArtistSongs, getGenreBySlug, getGenres, getGenreSongs } from '../../../lib/contentfulApi';
import { Desktop, Mobile } from '../../../components/Responsive';
import PageContainer, { MobilePageContainer } from '../../../components/PageContainer';
import NextLink from '../../../components/NextLink';
import SongList from '../../../components/SongList';
import IndexPageAvatarHeader from '../../../components/IndexPageAvatarHeader';
import { resizeImageFromUrl } from '../../../helper/image';
import styled from "styled-components"
import Layout from '../../../components/Layout';
import { Site } from '../../../utils/page';

interface GenrePageProps {
    genre: any;
    songs: any;
}

const GenrePageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

const Genre = ({ genre, songs }: GenrePageProps) => {
  const avatarSrc = resizeImageFromUrl(genre?.coverImage?.url)
  return (
  <Layout title={`${genre?.name} | ${Site.Title}`}>
    <Desktop>
        <GenrePageContainer>
        <PageContainer>
        <NextLink href="/genres">Go Back </NextLink>
          <IndexPageAvatarHeader title={genre?.name} avatarSrc={avatarSrc} />
          <SongList 
                songs={songs}
            />
        </PageContainer>
        </GenrePageContainer>
      </Desktop>
      <Mobile>
      <GenrePageContainer>
        <MobilePageContainer>
        <NextLink href="/genres">Go Back </NextLink>
          <IndexPageAvatarHeader title={genre?.name} avatarSrc={avatarSrc} />
          <SongList 
                songs={songs}
            />
        </MobilePageContainer>
        </GenrePageContainer>
      </Mobile>
  </Layout>)
};

export const getStaticProps = async (context: any) => {
    const slug = context.params.slug;
    const genre = await getGenreBySlug(slug)
    const songs = await getGenreSongs(genre?.sys?.id)
    
    return {
        props: {
            genre,
            songs
        },
        revalidate: 10,
    }
}

export const getStaticPaths = async () => {
    const genres = await getGenres()

    const slugs = genres.map((genre: any) => genre.slug);
    const paths = slugs.map((slug: any) => ({params: {slug: slug.toString()}}))

    return {
        paths,
        fallback: 'blocking'
    }
}

export default Genre;
