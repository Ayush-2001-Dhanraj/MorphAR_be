import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/users.js";
import chatRouter from "./routes/chats.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to Areisis Backend" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
