import Head from 'next/head'
import ArticleList from '../components/ArticleList'

const Home = ({articles}: any) => {
  return (
    <div>
     <Head>
       <title>Who Looped</title>
       <meta name='keywords' content='Discover loops and soundpacks used in todays songs'/>
     </Head>
     {/* <ArticleList articles={articles}/> */}
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`);
  const articles = await res.json();

  return {
    props: {
      articles
    }
  }
}
