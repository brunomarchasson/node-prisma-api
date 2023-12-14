import nodemailer from 'nodemailer';
import env from '../../env.js';

const defaultVars = {
  projectName: env.APP_NAME ?? 'Awesome project',
  email: 'toto@toto.com',
  account: {
    id: '1',
    email: 'toto@toto.com',
  },
  inviteToken: '[token]',
};

const defaultTheme = {
  bgColor: '#042440',
  textColor: '#ffffff',
  primaryColor: '#29B3CC',
  secondaryColor: '#112f4a',
  tertiaryColor: '#447C94',
  round: '15px',
};

export const generateEmail = (
  EMail,
  vars = defaultVars,
  theme = defaultTheme,
) => EMail(vars, theme).html;

export const sendEmail = (email, subject, html) => new Promise((resolve, reject) => {
  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_SERVER,
      port: env.SMTP_PORT,
      secure: true,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PWD,
      },
    });

    const mailOptions = {
      from: env.SMTP_USER,
      to: email,
      subject,
      html: !!html && html,
    };

    // eslint-disable-next-line no-unused-vars
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      return resolve();
    });
  } catch (err) {
    console.error(err);
    reject(err);
  }
  resolve();
});

export default generateEmail;
