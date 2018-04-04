const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ subject, sender, recipient }, content) {
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.senderEmail = sender;
    this.body = new helper.Content("text/html", content);
    this.recipients = recipient;

    this.addContent(this.body);
  }
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    const response = await TouchList.sgApi.API(request);
    return response;
  }
  catch(error) {
    console.log("error", error.response.body);
  }
}

module.exports = Mailer;
