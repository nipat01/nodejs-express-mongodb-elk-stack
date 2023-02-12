const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mongoUri = "mongodb://localhost:27017/test-lo?retryWrites=true&w=majorityg";
// const mongoUri = "mongodb+srv://db_dev:a5hCifm6FmhFZjt@cluster-test.ra2jt.mongodb.net/test-log?retryWrites=true&w=majority";

app.use(express.json());

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  data: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Log = mongoose.model('Log', logSchema);

app.post('/logs', async (req, res) => {
  console.log("req: ", req.body);
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).send(log);
  } catch (error) {
    res.status(400).send(error);
  }
});

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
})
.catch((error) => {
  console.error(error);
});
