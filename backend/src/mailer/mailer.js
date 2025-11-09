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
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: subject,
    html: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!", info);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending Email:", error);
    return { success: false, error: error.message || error };
  }
};