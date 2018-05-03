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
  app.post("/api/v1/forms/:formId", (req, res) => {
    const { name, email, message } = req.body;
    console.log(req.body);

    Form.findById(req.params.formId, Form.recipient, err => {
      if (err) {
        res.send(err);
      }
        //const formRecipient = Form.recipient;

        const newForm = {
          name,
          email,
          message,
          recipient: "luke@coding-crowd.com"
        };
        console.log(newForm);
        const mailer = new Mailer(form, contactFormTemplate(newForm));
        mailer.send();
        res.send("Mail sent!");
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
