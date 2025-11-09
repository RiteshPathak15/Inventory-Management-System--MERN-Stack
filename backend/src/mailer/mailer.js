import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(
  process.env.SMTP_HOST
    ? {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true", // true for 465
        auth: {
          user: process.env.SMTP_USER || process.env.EMAIL,
          pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
        },
      }
    : {
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD, // use Gmail app password if 2FA enabled
        },
      }
);

export const sendMail = async (recipientEmail, body, subject) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject,
    html: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId || info);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message || error };
  }
};

export default transporter;