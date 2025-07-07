# Import the libraries we need
from flask import Flask, request, jsonify   # Flask is used to create API; jsonify is used to send responses
from flask_cors import CORS                 # CORS allows frontend (React) to connect to backend
import wikipedia                            # This is the Python package used to get data from Wikipedia

# Create the Flask application
app = Flask(__name__)

# Allow CORS (Cross-Origin Requests)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "<h1>Wikipedia Chatbot Backend is Running</h1>", 200

# Define a route for the chatbot API
@app.route('/chat', methods=['POST'])  # This route listens for POST requests at /chat
def chat():
    data = request.get_json()                   # Get JSON data from the frontend (example: {"question": "What is Linux?"})
    question = data.get('question', '')         # Extract the "question" field

    try:
        # Use the Wikipedia API to get a summary of the topic
        answer = wikipedia.summary(question, sentences=2)  # Limit to 2 sentences
    except Exception as e:
        # If anything goes wrong (no article found, etc.)
        answer = "Sorry, I couldn't find anything on that topic."

    return jsonify({'answer': answer})  # Return answer as JSON

# This starts the server when you run this file directly
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

