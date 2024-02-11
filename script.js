// script.js - クライアント側のスクリプトで、チャットインターフェースとサーバーとの通信を処理します。
// script.js - Client-side script to handle the chat interface and communication with the server

document.addEventListener('DOMContentLoaded', function() {
    // チャットフォーム、メッセージ入力欄、チャットウィンドウの要素を取得します。
    // Get elements for chat form, message input, and chat window.
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');

    // チャットウィンドウにメッセージを追加する関数
    // Function to append messages to the chat window
    function appendMessage(user, text) {
        // 新しいメッセージ要素を作成し、チャットウィンドウに追加します。
        // Create a new message element and add it to the chat window.
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', user);
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        // 最新のメッセージに自動スクロールします。
        // Auto-scroll to the latest message.
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // サーバーにメッセージを送信し、応答を受け取る関数
    // Send a message to the server and receive a response
    async function sendMessage(text) {
        try {
            // '/message'エンドポイントにPOSTリクエストを送信します。
            // Send a POST request to the '/message' endpoint.
            const response = await fetch('/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });

            // 応答が正常でない場合はエラーを投げます。
            // Throw an error if the response is not ok.
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 応答からデータを取得し、ボットからの返信をチャットウィンドウに追加します。
            // Get data from the response and append the bot's reply to the chat window.
            const data = await response.json();
            appendMessage('bot', data.reply);
        } catch (error) {
            // メッセージ送信時のエラーを処理します。
            // Handle errors when sending a message.
            console.error('Error sending message:', error);
            appendMessage('bot', 'Sorry, I am unable to respond at the moment.');
        }
    }

    // チャットフォームの送信イベントリスナー
    // Event listener for the chat form submission
    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // トリムされたメッセージテキストを取得します。
        // Get the trimmed message text.
        const messageText = messageInput.value.trim();

        // メッセージテキストがある場合、それをユーザーとして追加し、サーバーに送信します。
        // If there is message text, append it as a user and send it to the server.
        if (messageText) {
            appendMessage('user', messageText);
            sendMessage(messageText);
            // 送信後、入力フィールドをクリアします。
            // Clear the input field after sending.
            messageInput.value = '';
        }
    });
});
