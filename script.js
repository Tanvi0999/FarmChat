document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    // Check if input is empty
    if (!userInput.trim()) {
        return;
    }

    // Display user message
    displayMessage(userInput, 'user');

    // Clear input field
    document.getElementById('user-input').value = '';

    // Send the question to the backend API
    const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userInput }),
    });

    const data = await response.json();

    // Check if the response has an answer and display it
    if (data.answer) {
        displayMessage(data.answer, 'bot');
    } else {
        displayMessage("Sorry, I couldn't understand your question.", 'bot');
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}
