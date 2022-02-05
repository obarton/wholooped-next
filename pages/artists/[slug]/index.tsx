import React from 'react';
import { useRouter } from 'next/router';
import { getArtistBySlug, getArtists, getArtistSongs } from '../../../lib/contentfulApi';
import { Desktop } from '../../../components/Responsive';
import PageContainer from '../../../components/PageContainer';
import NextLink from '../../../components/NextLink';
import SongList from '../../../components/SongList';
import IndexPageAvatarHeader from '../../../components/IndexPageAvatarHeader';
import { resizeImageFromUrl } from '../../../helper/image';

interface ArtistPageProps {
    artist: any;
    songs: any;
}

const Artist = ({ artist, songs }: ArtistPageProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const avatarSrc = resizeImageFromUrl(artist?.photo?.url)
  return (
  <>
    <Desktop>
        <PageContainer>
          <IndexPageAvatarHeader title={artist?.name} avatarSrc={avatarSrc} />
          <SongList 
                songs={songs}
            />
          <NextLink href="/artists">Go Back </NextLink>
        </PageContainer>
      </Desktop>

  </>)
};

export const getStaticProps = async (context: any) => {
    const slug = context.params.slug;
    const artist = await getArtistBySlug(slug)
    const songs = await getArtistSongs(artist?.sys?.id)
    
    return {
        props: {
            artist,
            songs
        }
    }
}

export const getStaticPaths = async () => {
    const artists = await getArtists()

    const slugs = artists.map((artist: any) => artist.slug);
    const paths = slugs.map((slug: any) => ({params: {slug: slug.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default Artist;
