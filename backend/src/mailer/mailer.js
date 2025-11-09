import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD, // Use App Password if 2FA is enabled
  },
  debug: true, // Enable debug logs
  logger: true, // Enable logger
});

export const sendMail = async (recipientEmail, body, subject) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject,
    html: body,
  };

  try {
    console.log("Attempting to send email to:", recipientEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);
    return { success: true, info };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error.message };
  }
};

export default transporter;