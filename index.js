const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const categoryRoute=require("./routes/categoryRoute")
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
//Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Home Route Running");
});

//Route middleware
app.use("/api/users", userRouter);

app.use("/api/product", productRouter);

app.use("/api/category",categoryRoute);
//Error middleware
app.use(errorHandler);

//connect to db and start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Mongoose connection failed",e);
  });
