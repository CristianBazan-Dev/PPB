require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const { json } = require("express");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/api/users", require("./routes/userRouter"));

app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/subcategoryRouter"));
app.use("/api", require("./routes/secSubcategoryRouter"))

app.use("/api", require("./routes/productRouter"));

app.use("/api", require("./routes/bannerRouter"));
app.use("/api", require('./routes/updateShipping'))

app.use("/api", require("./routes/checkoutRouter"));

app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/bannerUpload"));

app.use("/api", require("./routes/MPayment"));

app.use("/api", require("./routes/mailRouter"));




// Connect to db
const URI = process.env.MONGODB_URI;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Server connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
