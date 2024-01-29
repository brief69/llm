// database.js
// Simple in-memory database for storing chat sessions

class Database {
  constructor() {
    // In-memory storage for chat sessions
    this.sessions = {};
  }

  // Save a message to a session
  saveMessage(sessionId, message) {
    if (!this.sessions[sessionId]) {
      this.sessions[sessionId] = [];
    }
    this.sessions[sessionId].push(message);
  }

  // Retrieve all messages from a session
  getMessages(sessionId) {
    return this.sessions[sessionId] || [];
  }

  // Delete a session and its messages
  deleteSession(sessionId) {
    delete this.sessions[sessionId];
  }
}

// Export an instance of the Database class
// This ensures that there's only one instance being used across the application
module.exports = new Database();
