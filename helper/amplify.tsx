const devEndpoints = [
    {
      name: "ContentApi",
      endpoint: "https://uvlnknasg7.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "SongApi",
      endpoint: "https://jkd4ux5j0b.execute-api.us-west-2.amazonaws.com"
    },
    {
        name: "InteractionsApi",
        endpoint: "https://40n3d9l3if.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "LikesApi",
      endpoint: "https://txlzcsem0m.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "UserProfileManagementApi",
      endpoint: "https://cu6g86q1r4.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "UserProfileApi",
      endpoint: "https://3pamtt9wua.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "SubmissionsApi",
      endpoint: "https://qqgtep0169.execute-api.us-west-2.amazonaws.com"
  
    },
    {
      name: "SignUpApi",
      endpoint: "https://dfmwvq6cd6.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "SearchApi",
      endpoint: "https://1vxkdw0qn8.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "UsersApi",
      endpoint: "https://rtamputs31.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "AuthApi",
      endpoint: "https://slloxtqq3b.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "LoopmakerApi",
      endpoint: "https://uufxzd2mnj.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "LoopPackApi",
      endpoint: "https://6k7zfnqu84.execute-api.us-west-2.amazonaws.com"
    },
  ]

const prodEndpoints = [
    {
      name: "ContentApi",
      endpoint: "https://02mcdqxlfd.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "SongApi",
      endpoint: "https://5nknz4h2u4.execute-api.us-west-2.amazonaws.com"
    },
    {
        name: "InteractionsApi",
        endpoint: "https://08t1i66lu0.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "LikesApi",
      endpoint: "https://4j96cuesj8.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "UserProfileManagementApi",
      endpoint: "https://070oqsh6df.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "UserProfileApi",
      endpoint: "https://28nvprv8z8.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "SubmissionsApi",
      endpoint: "https://67ha5pvkj1.execute-api.us-west-2.amazonaws.com"
  
    },
    {
      name: "SignUpApi",
      endpoint: "https://4ptq0tqa3e.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "SearchApi",
      endpoint: "https://89cby3dnmc.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "UsersApi",
      endpoint: "https://1ni6lw0gag.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "AuthApi",
      endpoint: "https://53eiaey0s0.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "LoopmakerApi",
      endpoint: "https://33ma215sx3.execute-api.us-west-2.amazonaws.com"
    },
    {
      name: "LoopPackApi",
      endpoint: "https://6k7zfnqu84.execute-api.us-west-2.amazonaws.com"
    },
  ]

export const getAmplifyEndpoints = (stage: string) => {
    switch (stage) {
        case "dev":
            return devEndpoints;
        case "prod":
            return prodEndpoints;
        default:
            return devEndpoints;
    }
}