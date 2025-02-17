import nodemailer from "nodemailer";

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or any other email service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send OTP
export const sendMail = async (
  recipientEmail,
  body,
  subject
) => {
  const mailOptions = {
    from: process.env.EMAIL,// Sender email address
    to: recipientEmail, // Recipient email address
    subject: subject,
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending Email:", error);
  }
};