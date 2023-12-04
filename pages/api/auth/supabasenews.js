import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  console.log(req.body, "req.body");
  const { email } = req.body;
  console.log(email, "email");
  try {
    const { data: insertedData, error } = await supabase
      .from("newsletter")
      .insert({ email: email });
    if (error) {
      console.error("Error inserting data:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } else {
      console.log("Data inserted successfully:", insertedData);
      res.status(200).json({ success: true, message: "Newsletter successful" });
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

  return;
}
