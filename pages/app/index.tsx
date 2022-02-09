import React from 'react';
import Dashboard from '../../components/Dashboard';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '../../components/Layout';
import { PageTitles } from "../../utils/page"

const App = () => {
  
  return (
    <Layout title={PageTitles.Dashboard}>
      <Dashboard />
    </Layout>
  )
};

export default withPageAuthRequired(App);
