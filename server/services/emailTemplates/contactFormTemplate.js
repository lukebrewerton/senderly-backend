const keys = require("../../config/keys");

module.exports = form => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>You have a new message from your website</h3>
          <p>Name:</p>
          <p>${nuForm.name}</p>
          <p>Email Address:</p>
          <p>${nuForm.email}</p>
          <p>Message:</p>
          <p>${nuForm.message}</p>
        </div>
      </body>
    </html>
  `;
};
