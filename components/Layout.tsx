import Head from 'next/head';
import React from 'react';
import NavBar from './NavBar';
import { Site } from "../utils/page"

const Layout = ({ children, title }: any) => {
  const defaultTitle = `${Site.Title} | ${Site.Description}` 
  const pageTitle = title ? `${title} | ${Site.Title}` : defaultTitle;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='keywords' content={`${Site.Description}`}/>
      </Head>
      <NavBar />
        <div>
            <main>
                {children}
            </main>
        </div>
    </>
  );
};

export default Layout;
