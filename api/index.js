const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./db/connect");
const authRouter = require("./routes/auth");
const photoRouter = require("./routes/photo");
const placesRouter = require("./routes/places");
const cookieParser = require("cookie-parser");
const bookingRouter = require("./routes/booking");

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://192.168.0.106:5173",
  })
);

app.get("/test", (req, res) => {
  res.send("test working");
});

app.use("/", authRouter);
app.use("/photo", photoRouter);
app.use("/places", placesRouter);
app.use("/bookings", bookingRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const port = 3000;
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
