import React, { useState } from 'react';
import axios from 'axios';

export const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending message to server:', message);
      const res = await axios.post('http://localhost:3000/api/chat', { message });  // Використовуйте POST метод і правильну URL
      console.log('Response from server:', res.data);
      setResponse(res.data.choices[0].message.content);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.response ? error.response.data.error.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>ChatGPT Demo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
      {error && <p>{error}</p>}
      {response && <p>{response}</p>}
    </div>
  );
}


