import express from 'express';
import bootsrtap from "./src/modules/bootstrap.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

bootsrtap(express, app);

app.listen(process.env.PORT, () => {
  console.log(`Server Is Running at ${process.env.PORT}`);
});