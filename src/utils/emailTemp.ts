import { mailer } from "../mail/helper";

const emailMarketing = () => {
  mailer({
    destination: "",
    subject: "",
    text: "",
    html: `<!DOCTYPE html>
      <html lang="en">`,
  });
};

export default emailMarketing;
