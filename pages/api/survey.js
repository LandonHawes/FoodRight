import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const emailUsername = process.env.EMAIL_USERNAME;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const adminEmail = process.env.EMAIL_USERNAME; // Replace with your actual email address

  if (req.method === "POST") {
    const { menuItem, shortDescription } = req.body;

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
      to: adminEmail,
      subject: "New Survey",
      text: `New Survey\nMenu Item: ${menuItem}\nShort Description: ${shortDescription}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent to administrator:", info.response);

      res.status(200).json({ success: true, message: "Survey successful" });
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
