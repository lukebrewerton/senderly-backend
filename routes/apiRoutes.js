//This will contain the routes for the API
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
//const Mailer = require("../services/Mailer");

const Form = mongoose.model("forms");

module.exports = app => {
  //Route for testing API is live
  app.get("/api/v1/test", function(req, res) {
    res.send("This is the Senderly API Test route.");
  });

  //Main API route
  app.post("/api/v1/forms/:formId", async (req, res) => {
    const { name, email, message } = req.body;
    console.log(req.body);

    Form.findById(req.params.formId, "recipient", (err, form) => {
      if (err) {
        res.send(err);
      } else {
        const formRecipient = form.recipient;

        sgMail.setApiKey(keys.sendGridKey);

        const msg = {
          to: formRecipient,
          from: "Senderly.io <no-reply@senderly.io>",
          templateId: "c211124d-f3fb-43fd-8334-3f449a38fab3",
          substitutionWrappers: ["{{", "}}"],
          substitutions: {
            name: name,
            email: email,
            message: message
          }
        };
        console.log();
        sgMail.send(msg);
        backURL=req.header('Referer') 
        res.redirect(backURL);
        console.log("Mail Sent!");
      }
    });
  });

  app.post("/api/v1/forms", requireLogin, async (req, res) => {
    const { title, recipient } = req.body;

    const form = new Form({
      title,
      recipient,
      _user: req.user.id
    });

    try {
      await form.save();
      res.send(req.body);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
