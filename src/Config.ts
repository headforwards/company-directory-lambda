const config = {
    appId: process.env.REACT_APP_MS_APP_ID!,
    scopes: [
      "user.readbasic.all",
      "user.read.All",
      "calendars.read"
    ]
  }

export default config