import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

//Routes

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone API");
});
app.use("/user", userRoutes);
app.use("/question", questionRoutes);
app.use("/answer", answerRoutes);

const port = process.env.PORT;
//connect mongoDB databae
const connection_url = process.env.CONNECTION_URL;

mongoose
  .connect(connection_url)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
