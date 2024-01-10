const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection succesful');
  })
  .catch((err) => {
    console.log('Database connection error' + err);
  });
