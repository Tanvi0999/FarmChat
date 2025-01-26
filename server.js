// server.js (Backend)

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Get the port from .env file, fallback to 5000

// Get Azure subscription key from .env
const azureSubscriptionKey = process.env.AZURE_SUBSCRIPTION_KEY;

app.use(cors());
app.use(express.json());

// Define a route for the root path '/'
app.get('/', (req, res) => {
  // res.send('Hello World! Server is running!');
});

// POST route for /ask
app.post('/ask', async (req, res) => {
  const question = req.body.question;

  const url = "https://farmchat.cognitiveservices.azure.com/language/query-knowledgebases?projectName=Agriculture&api-version=2021-10-01&deploymentName=production";

  const headers = {
    "Ocp-Apim-Subscription-Key": azureSubscriptionKey, // Use the subscription key from .env
    "Content-Type": "application/json"
  };
})

const body = {
  top: 1,
  question: question,
  includeUnstructuredSources: true,
  confidenceScoreThreshold: "0.5",
  answerSpanRequest: {
    enable: true,
    topAnswersWithSpan: 1,
    confidenceScoreThreshold: "0.5"
  }
};

try {
  const url = "https://farmchat.cognitiveservices.azure.com/language/query-knowledgebases?projectName=Agriculture&api-version=2021-10-01&deploymentName=production"; // Replace with the correct URL
  const body = { question: "What is space?" };
  const headers = { 'Content-Type': 'application/json' };

  console.log('Sending request to:', url);
  console.log('Request body:', body);

  const response = await axios.post(url, body, { headers });

  console.log('Response:', response.data);

  if (response.data.answers && response.data.answers.length > 0) {
    const answer = response.data.answers[0].answer;
    console.log('Answer:', answer);
    res.json({ answer });
  } else {
    console.error('No answer found in the response');
    res.status(404).json({ error: 'No answer found for the question.' });
  }
} catch (error) {
  console.error('Error:', error.response ? error.response.status : error.message);
  console.error('Response data:', error.response ? error.response.data : 'No response data');
  res.status(500).json({ error: 'An error occurred while fetching the answer.' });
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
