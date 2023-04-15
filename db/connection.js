const mongoos = require("mongoose");

function DB_Connct(URL, CB) {
  return mongoos
    .connect(URL)
    .then(() => {
      console.log("DB is connected ^_^");
      CB();
    })
    .catch((err) => console.log(err));
}
module.exports = DB_Connct;
