// database.js
// Simple in-memory database for storing chat sessions
// チャットセッションを保存するためのシンプルなインメモリデータベース

class Database {
  constructor() {
    // In-memory storage for chat sessions
    // チャットセッションのためのインメモリストレージ
    this.sessions = {};
  }

  // Save a message to a session
  // セッションにメッセージを保存する
  saveMessage(sessionId, message) {
    if (!this.sessions[sessionId]) {
      this.sessions[sessionId] = [];
    }
    this.sessions[sessionId].push(message);
  }

  // Retrieve all messages from a session
  // セッションから全てのメッセージを取得する
  getMessages(sessionId) {
    return this.sessions[sessionId] || [];
  }

  // Delete a session and its messages
  // セッションとそのメッセージを削除する
  deleteSession(sessionId) {
    delete this.sessions[sessionId];
  }
}

// Export an instance of the Database class
// Databaseクラスのインスタンスをエクスポートする
// This ensures that there's only one instance being used across the application
// これにより、アプリケーション全体で1つのインスタンスのみが使用されることを保証する
module.exports = new Database();
