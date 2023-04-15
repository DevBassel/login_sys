require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const DB_Connct = require("./db/connection");

// middelwear
app.use(express.json());
app.use(cookieParser());

// DB
DB_Connct(process.env.DB_URL, () =>
  app.listen(3000, console.log("server run ob port 3000"))
);

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     next();
  });
app.get("/", (req, res) => {
  res.json({ msg: "Home" });
});
app.use("/", authRouter);
app.use("*",(req,res)=>{
  res.json({msg: "page not found"})
})
console.log();
