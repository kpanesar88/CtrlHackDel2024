const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
};

const data = {
    prompt: "What is the capital of France?",
    model: "text-davinci-003",
    max_tokens: 50,
    temperature: 0.7,
};

axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', data, { headers })
    .then(response => {
        console.log(response.data.choices[0].text);
    })
    .catch(error => {
        console.error(error);
    });
