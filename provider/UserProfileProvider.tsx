// src/context/state.js
import { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile as Auth0UserProfile, useUser } from '@auth0/nextjs-auth0';

const UserProfileContext = createContext({});

export function UserProfileProvider({ children }: any) {
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    fetch('/api/get-stage-data')
      .then((response) => response.json())
      .then((stages) => {
        setStages(stages);
      });
  }, []);
  

  const state = {
    userProfile
  }

  return (
    <UserProfileContext.Provider value={state}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfileContext() {
  return useContext(UserProfileContext);
}