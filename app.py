import json
from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
import os
import json

# Set your OpenAI API key
openai.api_key = "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"  # Replace with your OpenAI API key

# Path for the cache file
CACHE_FILE = 'openairesponse.json'

# Initialize Flask app
app = Flask(__name__)
cors = CORS(app)  # Allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

# Load cache data from JSON file
def load_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'r') as f:
            return json.load(f)
    return {}

# Save cache data to JSON file
def save_cache(cache_data):
    with open(CACHE_FILE, 'w') as f:
        json.dump(cache_data, f, indent=2)

@app.route('/ask', methods=["GET"])
def index():
    return jsonify({"message": "This is the main route"}), 201  # This serves the HTML file

@app.route('/ask', methods=['POST'])
def ask_openai():
    data = request.get_json()
    question = data.get('question')

    if not question:
        return jsonify({"error": "No question provided"}), 400

    # Load cache
    cache_data = load_cache()

    # Check if question is already cached
    if question in cache_data:
        return jsonify({"answer": cache_data[question]})

    try:
        # Query OpenAI API (updated method)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": question}
            ],
            max_tokens=300
        )

        # Access the response content
        answer = response['choices'][0]['message']['content'].strip()

        # Save the new response in the cache and update the JSON file
        cache_data[question] = answer
        save_cache(cache_data)

        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)