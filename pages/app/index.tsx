import React from 'react';
import Dashboard from '../../components/Dashboard';
import Layout from '../../components/Layout';
import { PageTitles } from "../../utils/page"

const App = () => {
  
  return (
    <Layout title={PageTitles.Dashboard}>
      <Dashboard />
    </Layout>
  )
};

export default App;
