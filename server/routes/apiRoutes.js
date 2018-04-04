//This will contain the routes for the API
const mongoose = require("mongoose");

module.exports = app => {
  //Route for testing API is live
  app.get("/api/v1/test", function(req, res) {
    res.send("This is the Senderly API Test route.");
  });

  //Main API route
  app.post("/api/v1/forms/:formId", (req, res) => {
    //TODO: Create Mailer and email templates before finalising route.
  });
};
