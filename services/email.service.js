const Mailgun = require("mailgun.js");
const FormData = require("form-data");

class EmailService {
  constructor() {
    this.apiKey = process.env.MAILGUN_API_KEY;
    this.domain = process.env.MAILGUN_DOMAIN;
    this.from = process.env.MAILGUN_FROM;
    const mailgun = new Mailgun(FormData);
    this.client = mailgun.client({ username: "api", key: this.apiKey });
  }

  async sendWelcomeEmail(to, subject, text) {
    const messageData = {
      from: this.from,
      to: to,
      subject: subject,
      text: text,
      "h:Reply-To": "info@sdl.pro",
      template: "Welcome Email",
    };

    try {
      const send = await this.client.messages.create(this.domain, messageData);
      console.log(send);
    } catch (error) {
      console.log(error);
    }
  }

  async sendLostPasswordEmail(to, variables) {
    const messageData = {
      from: this.from,
      to: to,
      subject: `Lost Password - Recovery code: ${variables.code}`,
      template: "lost password email",
      "h:Reply-To": "info@sdl.pro",
      "h:X-Mailgun-Variables": JSON.stringify(variables),
    };

    console.log(JSON.stringify(variables));

    try {
      const send = await this.client.messages.create(this.domain, messageData);
      console.log(send);
    } catch (error) {
      console.log(error);
    }
  }

  async sendPurchaseEmail(to, variables) {
    const messageData = {
      from: "SDL Pro Payment <payments@delivery.sdl.pro>",
      to: to,
      subject: `Your Payment Was Successful! - Order ID: ${variables.order_key}`,
      template: "Payment Successfull",
      "h:Reply-To": "info@sdl.pro",
      "h:X-Mailgun-Variables": JSON.stringify(variables),
    };

    console.log(JSON.stringify(variables));

    try {
      const send = await this.client.messages.create(this.domain, messageData);
      console.log(send);
    } catch (error) {
      console.log(error);
    }
  }

  async sendTestEmail(to, subject, text) {
    const messageData = {
      from: this.from,
      to: to,
      subject: subject,
      text: text,
    };

    return await this.client.messages.create(this.domain, messageData);
  }
}

module.exports = EmailService;
