import express from "express";
import sql from "./db/sql.js";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to Areisis Backend" });
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
