//This will contain the routes for the API

module.exports = app => {
  app.get("/api/v1/test", function(req, res) {
    res.send("This is the Senderly API Test route.");
  });
};
