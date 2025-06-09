import sql from "../db/sql.js";

export const getChats = async (req, res) => {
  const { clerk_id } = req.query;

  if (!clerk_id) return res.status(400).json({ error: "clerk_id is required" });

  try {
    const user = await sql`SELECT id FROM users WHERE clerk_id = ${clerk_id}`;
    if (user.length === 0)
      return res.status(404).json({ error: "User not found" });

    const chats = await sql`
      SELECT * FROM chats WHERE user_id = ${user[0].id} ORDER BY created_at DESC
    `;
    res.status(200).json(chats);
  } catch (err) {
    console.error("Get Chats Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChat = async (req, res) => {
  const { id } = req.params;

  const chat = await sql`
    SELECT * FROM chats WHERE id = ${id} ORDER BY created_at DESC
  `;
  res.status(200).json(chat[0]);
};

export const deleteChat = async (req, res) => {
  const { id } = req.params;

  await sql`
  DELETE FROM chats WHERE id = ${id}
    `;

  res.status(200).json({ msg: "Delete Successful" });
};

export const createChat = async (req, res) => {
  const { id, user_id, chat_history } = req.body;

  if (id) {
    //   Update previous entry
    try {
      const updated = await sql`
            UPDATE chats
            SET chat_history = ${chat_history}
            WHERE id = ${id}
            RETURNING *
          `;

      if (updated.length === 0) {
        return res.status(404).json({ error: "No chat found to update" });
      }

      res.status(200).json(updated[0]);
    } catch (err) {
      console.error("Update Chat Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    //   create new entry
    try {
      const newChat = await sql`
          INSERT INTO chats (user_id, chat_history)
          VALUES (${user_id}, ${chat_history})
          RETURNING *
        `;
      res.status(201).json(newChat[0]);
    } catch (err) {
      console.error("Create Chat Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
