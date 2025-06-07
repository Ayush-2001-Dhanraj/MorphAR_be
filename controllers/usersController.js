import sql from "../db/sql.js";

export const registerUser = async (req, res) => {
  try {
    const { email, clerk_id, name } = req.body;

    if (!email || !clerk_id) {
      return res
        .status(400)
        .json({ error: "Email and Clerk ID are required." });
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;

    if (existingUser.length > 0) {
      // User exists
      return res.status(200).json(existingUser[0]);
    }

    // Insert new user
    const newUser = await sql`
      INSERT INTO users (clerk_id, email, name)
      VALUES (${clerk_id}, ${email}, ${name})
      RETURNING *;
    `;

    res.status(201).json(newUser[0]);
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
