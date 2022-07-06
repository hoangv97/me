import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/post/hero';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import { CACHE_CONTROL_HEADER, WEB_TITLE } from '../lib/constants';
import Post from '../types/post';

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title>{WEB_TITLE}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              slug={heroPost.slug}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getServerSideProps = async ({ res }: any) => {
  res.setHeader('Cache-Control', CACHE_CONTROL_HEADER);

  const allPosts = await getAllPosts();

  return {
    props: { allPosts },
  };
};
