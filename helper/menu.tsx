export const defaultMobileMenuItems = (username: string) => [
    {
      title: "Browse",
      url: "/app",
      authRequired: false
    },
    {
      title: "My Profile",
      url: `/users/${username}`,
      authRequired: true
    },
    {
      title: "Community",
      url: "http://community.wholooped.com/",
      authRequired: false
    },
    {
      title: "Saved",
      url: "/app/saved",
      authRequired: true
    },
    {
      title: "Add A Song",
      url: "",
      authRequired: false
    }]
    
export const mobileLoopmakerMenuItems = [
      {
        title: "Browse",
        url: "/app",
        authRequired: false
      },
      {
        title: "My Profile",
        url: "/profile/select",
        authRequired: true
      },
      {
        title: "Community",
        url: "http://community.wholooped.com/",
        authRequired: false
      },
      {
        title: "Saved",
        url: "/app/saved",
        authRequired: true
      },
      {
        title: "Add A Song",
        url: "",
        authRequired: true
      }
    ]

export const defaultDesktopMenuItems = (username: string) => [
  {
    title: "Browse",
    url: "/app",
    authRequired: false
  },
  {
    title: "My Profile",
    url: `/users/${username}`,
    authRequired: true
  },
  {
    title: "Community",
    url: "http://community.wholooped.com/",
    authRequired: false
  },
  {
    title: "Saved",
    url: "/app/saved",
    authRequired: true
  }]
  
export const desktopLoopmakerMenuItems = [
    {
      title: "Browse",
      url: "/app",
      authRequired: false
    },
    {
      title: "My Profile",
      url: "/profile/select",
      authRequired: true
    },
    {
      title: "Community",
      url: "http://community.wholooped.com/",
      authRequired: false
    },
    {
      title: "Saved",
      url: "/app/saved",
      authRequired: true
    },
    {
      title: "NFT",
      url: "/create-nft",
      authRequired: true
    }
  ]