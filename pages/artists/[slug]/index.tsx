import React from 'react';
import { useRouter } from 'next/router';
import { getArtistBySlug, getArtists, getArtistSongs } from '../../../lib/contentfulApi';
import { Desktop, Mobile } from '../../../components/Responsive';
import PageContainer, { MobilePageContainer } from '../../../components/PageContainer';
import NextLink from '../../../components/NextLink';
import SongList from '../../../components/SongList';
import IndexPageAvatarHeader from '../../../components/IndexPageAvatarHeader';
import { resizeImageFromUrl } from '../../../helper/image';
import styled from "styled-components"
import Layout from '../../../components/Layout';
import { Site } from '../../../utils/page';

interface ArtistPageProps {
    artist: any;
    songs: any;
}

const ArtistPageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

const Artist = ({ artist, songs }: ArtistPageProps) => {
  const avatarSrc = resizeImageFromUrl(artist?.photo?.url)
  return (
  <Layout title={`${artist?.name} | ${Site.Title}`}>
    <Desktop>
        <ArtistPageContainer>
        <PageContainer>
        <NextLink href="/artists">Go Back </NextLink>
          <IndexPageAvatarHeader title={artist?.name} avatarSrc={avatarSrc} />
          <SongList 
                songs={songs}
            />
        </PageContainer>
        </ArtistPageContainer>
      </Desktop>
      <Mobile>
      <ArtistPageContainer>
        <MobilePageContainer>
        <NextLink href="/artists">Go Back </NextLink>
          <IndexPageAvatarHeader title={artist?.name} avatarSrc={avatarSrc} />
          <SongList 
                songs={songs}
            />
        </MobilePageContainer>
        </ArtistPageContainer>
      </Mobile>
  </Layout>)
};

export const getStaticProps = async (context: any) => {
    const slug = context.params.slug;
    const artist = await getArtistBySlug(slug)
    const songs = await getArtistSongs(artist?.sys?.id)
    
    return {
        props: {
            artist,
            songs
        },
        revalidate: 10,
    }
}

export const getStaticPaths = async () => {
    const artists = await getArtists()

    const slugs = artists.map((artist: any) => artist.slug);
    const paths = slugs.map((slug: any) => ({params: {slug: slug.toString()}}))

    return {
        paths,
        fallback: 'blocking'
    }
}

export default Artist;
