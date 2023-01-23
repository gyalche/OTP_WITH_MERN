import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

let nodeConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: email, // generated ethereal user
    pass: password, // generated ethereal password
  },
};
let transporter = nodemailer.createTransport(nodeConfig);
let MailGenerator = new Mailgen({
  theme: 'Default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  //body of the email;
  var email = {
    body: { name: username, intro: text || 'Dawa', outro: 'Need help' },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: email,
    to: userEmail,
    subject: subject || 'Signup',
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: 'You should receive an email from us' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
