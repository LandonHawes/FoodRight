import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const emailUsername = process.env.EMAIL_USERNAME;
  const emailPassword = process.env.EMAIL_PASSWORD;
  if (req.method === "POST") {
    const { email } = req.body;

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: emailUsername,
      to: emailUsername,
      subject: "New Newsletter Subscription",
      text: `New subscription from: ${email}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      res
        .status(200)
        .json({ success: true, message: "Subscription successful" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
