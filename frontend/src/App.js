import React, { useState } from 'react';
import './App.css'; // Optional: You can style your chatbot using CSS

function App() {
  // State variables to store question, answer, and loading status
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // This function runs when the "Ask" button is clicked
  const askQuestion = async () => {
    setLoading(true); // show loading spinner or status if needed

    try {
      // Send POST request to Flask backend hosted on EC2 public IP
      const res = await fetch('http://13.222.178.50:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question })
      });

      // Parse the backend response
      const data = await res.json();
      setAnswer(data.answer); // Show answer on screen
    } catch (err) {
      console.error("❌ Error in fetch:", err); // Show exact error in DevTools Console
      setAnswer('❌ Something went wrong. Please try again.');
    }

    setLoading(false); // hide loader
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📚 Wikipedia Chatbot</h1>

      <input
        type="text"
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={styles.input}
      />

      <button onClick={askQuestion} style={styles.button}>
        {loading ? 'Loading...' : 'Ask'}
      </button>

      {answer && (
        <div style={styles.answerBox}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

// Inline styling for simplicity
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px'
  },
  input: {
    width: '80%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  answerBox: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd'
  }
};

export default App;

