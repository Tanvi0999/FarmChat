const axios = require("axios");

async function analyzeFeedback(feedbacks) {
    const apiKey = "2NKtXZPExdSWwWngy5qKrp3YsW57izN3OXjDXuDobhz8YAyICcKOJQQJ99BAACYeBjFXJ3w3AAAaACOGa8DY"; // Replace with your Azure Text Analytics key
    const endpoint = "https://farmchat.cognitiveservices.azure.com/"; // Replace with your Azure Text Analytics endpoint

    // Prepare documents for multiple feedback inputs
    const documents = feedbacks.map((feedback, index) => ({
        id: (index + 1).toString(),
        text: feedback,
        language: "en",
    }));

    try {
        const response = await axios.post(
            `${endpoint}/text/analytics/v3.1/sentiment`,
            { documents },
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": apiKey,
                    "Content-Type": "application/json",
                },
            }
        );

        // Return detailed results
        return response.data.documents;
    } catch (error) {
        console.error("Error analyzing feedback:", error.response?.data || error.message);
        throw error;
    }
}

// Example Feedbacks (Add more feedback entries)
const feedbacks = [
    "The fertilizer subsidy helped me, but it arrived late.",
    "The training program was excellent and very informative.",
    "I didn't receive the benefits I applied for, and no one responded to my queries.",
    "The pest control tips were helpful, and my crop yield improved significantly.",
    "The process for getting the loan was too complicated and took too long.",
];

// Analyze the feedback
analyzeFeedback(feedbacks).then((results) => {
    results.forEach((result) => {
        console.log(`Feedback ID: ${result.id}`);
        console.log(`Sentiment: ${result.sentiment}`);
        console.log("Confidence Scores:");
        console.log(`  Positive: ${result.confidenceScores.positive}`);
        console.log(`  Neutral: ${result.confidenceScores.neutral}`);
        console.log(`  Negative: ${result.confidenceScores.negative}`);
        console.log("-------------------------------");
    });
}).catch((error) => {
    console.error("An error occurred during sentiment analysis:", error);
});
