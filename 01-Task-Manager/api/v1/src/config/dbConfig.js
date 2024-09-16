const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, { dbName: "My-Task-Manager" });
};

module.exports = connectDB;
