module.exports = {
  cookieKey: process.env.COOKIE_KEY,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  sendGridKey: process.env.SENDGRID_KEY,

  stripeOptions: {
    apiKey: process.env.STRIPE_KEY,
    stripePubKey: process.env.STRIPE_PUB_KEY,
    defaultPlan: "free",
    plans: ["free", "low-volume", "med-volume", "high-volume"],
    planData: {
      free: {
        name: "Free",
        price: 0
      },
      "low-volume": {
        name: "Low Volume",
        price: 9
      },
      "med-volume": {
        name: "Medium Volume",
        price: 19
      },
      "high-volume": {
        name: "High Volume",
        price: 29
      }
    }
  }
};
