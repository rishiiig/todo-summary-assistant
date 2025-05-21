import React, { useState } from 'react';
import axios from 'axios';

const SummaryButton = () => {
  const [status, setStatus] = useState('');

  const handleSummarize = async () => {
    try {
      setStatus('Summarizing...');
      const res = await axios.post('/summarize');
      setStatus('✅ Sent to Slack!');
    } catch (err) {
      console.error('Error summarizing:', err.message);
      setStatus('❌ Failed to summarize.');
    }
  };

  return (
    <div>
      <button onClick={handleSummarize}>Summarize & Send to Slack</button>
      <p>{status}</p>
    </div>
  );
};

export default SummaryButton;
