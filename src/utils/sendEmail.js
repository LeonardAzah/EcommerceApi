require("dotenv").config();
const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);
  return transporter.sendMail({
    from: '"E-commerce-api" <process.env.EMAIL>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });
};

module.exports = sendEmail;
