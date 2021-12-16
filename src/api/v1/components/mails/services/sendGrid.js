import sendGrid from '@sendgrid/mail';
import logger from '../../../log';

class SendGrid {
  #data;

  constructor() {
    this.#data = {
      to: '',
      from: `Hartt Group <${process.env.CUSTOMER_EMAIL}>`,
      subject: '',
      text: '',
      html: '',
    };
  }

  setReceiver(mail) {
    this.#data.to = mail;
    return this;
  }

  setSubject(subject) {
    this.#data.subject = subject;
    return this;
  }

  setText(text) {
    this.#data.text = text;
    return this;
  }

  setHtml(htmlString) {
    this.#data.html = htmlString;
    return this;
  }

  async send() {
    try {
      sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
      const mail = await sendGrid.send(this.#data);
      return mail;
    } catch (error) {
      logger.log(`Error when send mail by send grid: ${error.message}`);
      throw new Error(error.message);
    }
  }
}

export default SendGrid;
