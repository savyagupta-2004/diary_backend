const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/deardiary";

// const connectTomongo = () => {
//   mongoose.connect(mongoURI, () => {
//     console.log("connected to mongoose");
//   });
// };
const connectTomongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to mongoose");
  } catch (error) {
    console.error("Error connecting to mongoose:", error);
  }
};
module.exports = connectTomongo;
