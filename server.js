require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.json({
    msg: 'Hello'
  });
});

// Routing api
app.use('/api', require('./routers/authRouter'));

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if(err) throw err;
  console.log('Database is connected');
});

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('Server is running on port', port);
});