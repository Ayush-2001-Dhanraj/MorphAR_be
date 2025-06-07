import express from "express";
import sql from "./db/sql.js";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/users.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

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
