// script.js - Client-side script to handle the chat interface and communication with the server

document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');

    // Function to append messages to the chat window
    function appendMessage(user, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', user);
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the latest message
    }

    // Send a message to the server and receive a response
    async function sendMessage(text) {
        try {
            const response = await fetch('/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            appendMessage('bot', data.reply);
        } catch (error) {
            console.error('Error sending message:', error);
            appendMessage('bot', 'Sorry, I am unable to respond at the moment.');
        }
    }

    // Event listener for the chat form submission
    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const messageText = messageInput.value.trim();

        if (messageText) {
            appendMessage('user', messageText);
            sendMessage(messageText);
            messageInput.value = ''; // Clear the input field after sending
        }
    });
});
