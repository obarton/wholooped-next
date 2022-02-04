import React from 'react';
import NavBar from './NavBar';

const Layout = ({ children }: any) => {
  return (
      <>
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
