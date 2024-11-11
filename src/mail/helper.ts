import nodemailer, { Transporter } from "nodemailer";

interface MilerOptions {
  destination: string;
  subject: string;
  text: string;
  html: string;
}
export const mailer = ({
  destination,
  subject,
  text,
  html,
}: MilerOptions): void => {
  let transporter: Transporter = nodemailer.createTransport({
    host: "smtp.email",
    port: 465,
    secure: true,
    auth: {
      user: "baba",
      pass: "12345",
    },
  });

  var mailOption = {
    from: "me",
    to: destination,
    subject: subject,
    text: text,
    html: html,
  };
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
