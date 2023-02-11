const express = require('express');
const app = express();
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Connect to MongoDB
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://db_dev:a5hCifm6FmhFZjt@cluster-test.ra2jt.mongodb.net/test-log?retryWrites=true&w=majority";
// const uri = "mongodb+srv://<username>:<password>@cluster.mongodb.net/test?retryWrites=true&w=majority";
// mongodb+srv://db_dev:a5hCifm6FmhFZjt@cluster-test.ra2jt.mongodb.net/?retryWrites=true&w=majority

// Define custom format for Winston logs
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Initialize Winston logger
const logger = createLogger({
  format: combine(
    label({ label: 'express-app' }),
    timestamp(),
    customFormat
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB and log any errors
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    logger.error(err.message);
  }
});

// Middleware to log all incoming requests
app.use((req, res, next) => {
  logger.info(`${req.method} request received at ${req.originalUrl}`);
  next();
});

app.post('/log', (req, res) => {
  // Insert log into MongoDB

  console.log('Received request body: ', req.body);

  
  console.log('log ', log);
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      logger.error(err.message);
      return res.status(500).json({ message: 'Error inserting log into MongoDB' });
    }
    const db = client.db('test');
    const logs = db.collection('logs');
    logs.insertOne(req.body, (err, result) => {
      if (err) {
        logger.error(err.message);
        return res.status(500).json({ message: 'Error inserting log into MongoDB' });
      }
      client.close();
      logger.info(`Inserted log into MongoDB: ${JSON.stringify(req.body)}`);
      res.json({ message: 'Log inserted into MongoDB successfully' });
    });
  });


});

app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});