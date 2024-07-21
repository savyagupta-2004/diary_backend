const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://guptasavya667:diXO9U26WfHQTX6a@cluster0.ya1dgnj.mongodb.net/";

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
