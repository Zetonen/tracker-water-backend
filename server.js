import app from "./app.js";
import mongoose from "mongoose";

const { PORT, DB__HOST } = process.env;
console.log(PORT, DB__HOST);
mongoose
  .connect(DB__HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
