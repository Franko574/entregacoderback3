import nodemailer from "nodemailer";
import { config } from "../config/config.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: config.mailer.auth,
    });
  }

  getMessageTemplate(type, content) {
    let body = "";

    switch (type) {
      case "ticket":
        body = `¡Gracias ${user.name} por registrarte en Cyclos! 
				
				<p>¿Estás buscando nuevas oportunidades laborales o quieres cambiar de trabajo? Sabemos que encontrar el empleo perfecto puede ser un desafío, pero con nuestra nueva app, lo harás más fácil y rápido</p>
				<p>Te seguiremos contactando a este mail ${user.mail}</p>
				`;

        break;
    }
    return body;
  }

  async sendMail({ to, subject, type, content }) {
    const message = this.getMessageTemplate(type, content);
    const info = await this.transporter.sendMail({
      from: "Cyclos-Consegui tu trabajo ideal en cualquier parte del mundo cyclos@gmail.com",
      to,
      subject,
      html: message,
      attachments: [],
    });
  }
}

export const mailService = new MailService();
