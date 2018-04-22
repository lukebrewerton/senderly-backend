const StripeWebhook = require("stripe-webhook-middleware");
const keys = require("../config/keys");

const stripeWebhook = new StripeWebhook({
  stripeApiKey: keys.stripeOptions.apiKey,
  respond: true
});

module.exports = app => {
  app.post("/billing/events", stripeWebhook.middleware);
};
