const readline = require('readline');
const { getAnswerFromGPT } = require('../api/aiHandler');  // Import the function from aiHandler.js

// Set up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt the user for input
const askQuestion = () => {
  rl.question('Ask a first aid question: ', async (question) => {
    // Get the answer from GPT
    const answer = await getAnswerFromGPT(question);

    // Print the answer to the terminal
    console.log(`Answer: ${answer}`);

    // Close the readline interface
    rl.close();
  });
};

// Start the process by asking a question
askQuestion();