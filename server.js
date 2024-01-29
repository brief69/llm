const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chatbot = require('./chatbot');
const config = require('./config.json');

const app = express();
const PORT = config.serverPort || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle chat messages
app.post('/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || !sessionId) {
      return res.status(400).send({ error: 'Message and sessionId are required' });
    }

    // Initialize the chatbot if it hasn't been already
    if (!chatbot.model) {
      await chatbot.initialize();
    }

    // Get the chatbot's response
    const response = await chatbot.respondToQuery(message);

    // Save the conversation to the database
    chatbot.database.saveMessage(sessionId, { message, response });

    // Send the response back to the client
    res.send({ response });
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
