require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const systemDetailsRouter = require('./Routes/routes'); 

const app = express();

// Connect to MongoDB using environment variable
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send("Hi there! Control called");
});

app.use('/api/systemDetails', systemDetailsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started on port ${port}`));
