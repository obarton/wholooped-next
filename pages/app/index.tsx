import React from 'react';
import Dashboard from '../../components/Dashboard';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const App = () => {
  return <Dashboard />;
};

export default withPageAuthRequired(App);
