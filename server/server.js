const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User");
require("./models/Form");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Import routes for Auth, Billing and API
require("./routes/authRoutes")(app);
//require("./routes/billingRoutes")(app);
require("./routes/apiRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
