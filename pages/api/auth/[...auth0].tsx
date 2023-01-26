// pages/api/auth/[...auth0].tsx
import auth0 from '../../../lib/auth0';

export default auth0.handleAuth({
    async login(req, res) {
      await auth0.handleLogin(req, res, {
        returnTo: "/app",
      });
    },
  });