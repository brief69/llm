const express = require('express'); // Expressフレームワークをインポートします。Import the Express framework.
const bodyParser = require('body-parser'); // リクエストのボディを解析するためのbody-parserミドルウェアをインポートします。Import the body-parser middleware to parse request bodies.
const path = require('path'); // ファイルパスを操作するためのpathモジュールをインポートします。Import the path module to manipulate file paths.
const chatbot = require('./chatbot'); // チャットボットのロジックを含むファイルをインポートします。Import the file containing the chatbot logic.
const config = require('./config.json'); // 設定ファイルをインポートします。Import the configuration file.

const app = express(); // Expressアプリケーションを作成します。Create an Express application.
const PORT = config.serverPort || 3000; // サーバーのポートを設定ファイルから取得、またはデフォルトの3000を使用します。Get the server port from the configuration file, or use the default of 3000.

// JSONリクエストを解析するためのミドルウェアを設定します。Set up middleware to parse incoming JSON requests.
app.use(bodyParser.json());

// 'public'ディレクトリから静的ファイルを提供するためのミドルウェアを設定します。Set up middleware to serve static files from the 'public' directory.
app.use(express.static(path.join(__dirname, 'public')));

// チャットメッセージを処理するエンドポイントを設定します。Set up an endpoint to handle chat messages.
app.post('/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body; // リクエストボディからメッセージとセッションIDを取得します。Extract the message and sessionId from the request body.
    if (!message || !sessionId) { // メッセージまたはセッションIDがない場合はエラーを返します。Return an error if either the message or sessionId is missing.
      return res.status(400).send({ error: 'Message and sessionId are required' });
    }

    // チャットボットがまだ初期化されていない場合は初期化します。Initialize the chatbot if it hasn't been already.
    if (!chatbot.model) {
      await chatbot.initialize();
    }

    // チャットボットからの応答を取得します。Get the chatbot's response.
    const response = await chatbot.respondToQuery(message);

    // 会話をデータベースに保存します。Save the conversation to the database.
    chatbot.database.saveMessage(sessionId, { message, response });

    // クライアントに応答を返送します。Send the response back to the client.
    res.send({ response });
  } catch (error) { // エラー処理。Error handling.
    console.error('Error handling chat message:', error); // チャットメッセージの処理中にエラーが発生しました。An error occurred while handling the chat message.
    res.status(500).send({ error: 'Internal server error' }); // 内部サーバーエラーを返します。Return an internal server error.
  }
});

// サーバーを起動します。Start the server.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // サーバーが指定されたポートで実行されていることをログに記録します。Log that the server is running on the specified port.
});
