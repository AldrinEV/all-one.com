const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    appendMessage(message, 'user');
    userInput.value = '';

    const loadingMessage = appendMessage('Loading...', 'loading');

    // Simplified API call for testing
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_ACTUAL_API_KEY`, // Make sure this is your actual key
        },
        body: JSON.stringify({
            model: 'gpt-4', // Use 'gpt-4' or 'gpt-5' if available
            messages: [{ role: 'user', content: message }],
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Log response status
        }
        return response.json();
    })
    .then(data => {
        console.log('Response from OpenAI:', data); // Log the full response for debugging
        const botResponse = data.choices[0].message.content;
        chatBox.removeChild(loadingMessage);
        appendMessage(botResponse, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        chatBox.removeChild(loadingMessage);
        appendMessage('Sorry, there was an error.', 'bot');
    });
}

function appendMessage(message, sender) {
    const messageElement = document.createElement('p');
    messageElement.className = sender === 'user' ? 'user-message' : 
                               sender === 'bot' ? 'bot-response' : 'loading';
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement; // Return the message element for loading indicator removal
}