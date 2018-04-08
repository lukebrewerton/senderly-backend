//This will contain the routes for the API
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require("../services/Mailer");
const contactFormTemplate = require("../services/emailTemplates/contactFormTemplate");

const Form = mongoose.model("forms");

module.exports = app => {
  //Route for testing API is live
  app.get("/api/v1/test", function(req, res) {
    res.send("This is the Senderly API Test route.");
  });

  //Main API route
  app.post("/api/v1/forms/:formId", async (req, res) => {
    //TODO: Create Mailer and email templates before finalising route.
    const { name, email, message } = req.body;

    Form.findById(req.params.formId, (err, form) => {
      if (err) {
        res.send(err);
      } else {
        const nuForm = Form({
          name: req.body.name,
          email: req.body._email,
          message: req.body._message,
          recipient: form.recipient
        });
      }
    });
    const mailer = new Mailer(nuForm, contactFormTemplate(nuForm));
    try {
      await mailer.send();
    } catch (err) {
      res.status(422).send(err);
    }
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
