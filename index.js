require("dotenv").config();
const express = require("express");
const { connectToDB } = require("./Config/db");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const classroomRouter = require("./routes/classroomRoutes");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 5000;

// middelwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Call the connectDB
connectToDB();

app.use("/api/user", userRouter);
app.use("/api/classroom", classroomRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
