require("dotenv").config();
module.exports = {
  //   host: "smtp.mailtrap.io",
  //   port: 2525,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
