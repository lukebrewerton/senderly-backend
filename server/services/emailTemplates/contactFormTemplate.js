const keys = require("../../config/keys");

module.exports = form => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>You have a new message from your website</h3>
          <p>Name:</p>
          <p>${newForm.name}</p>
          <p>Email Address:</p>
          <p>${newForm.email}</p>
          <p>Message:</p>
          <p>${newForm.message}</p>
        </div>
      </body>
    </html>
  `;
};
