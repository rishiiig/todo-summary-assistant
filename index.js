const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


const app = express();
app.use(express.json());

const PORT = 3000;

// In-memory list of todos
let todos = [];

// ✅ GET /todos – fetch all todos
app.get('/todos', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ POST /todos – add a new todo
app.post('/todos', async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task is required' });

  const { data, error } = await supabase.from('todos').insert([{ task }]).select().single();
  if (error) return res.status(500).json({ error: error.message });
  
  res.status(201).json(data);
});


// ✅ DELETE /todos/:id – delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('todos').delete().eq('id', id).select().single();
  if (error) return res.status(404).json({ error: 'Todo not found or already deleted' });

  res.json({ message: 'Todo deleted', todo: data });
});


// Test Slack message route (still works)
app.post('/send-test-message', async (req, res) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  const message = { text: '✅ This is a test message from your Todo Summary Assistant!' };

  try {
    await axios.post(webhookUrl, message);
    res.status(200).json({ message: 'Message sent to Slack successfully!' });
  } catch (error) {
    console.error('Error sending to Slack:', error.message);
    res.status(500).json({ error: 'Failed to send message to Slack.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.post('/summarize', async (req, res) => {
  try {
    const { data: todos, error } = await supabase.from('todos').select('task');
    if (error) return res.status(500).json({ error: error.message });
    if (!todos.length) return res.status(400).json({ error: "No todos to summarize." });

    const taskList = todos.map((t, i) => `${i + 1}. ${t.task}`).join('\n');

    const prompt = `Summarize the following to-do items in a concise and friendly way:\n\n${taskList}`;
    
    // Gemini API endpoint & headers
    const response = await axios.post('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent', {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY
      }
    });
    
    // Extract summary from Gemini response
    const summary = response.data.candidates[0].content.parts[0].text;
    
    // Send summary to Slack webhook
    await axios.post(process.env.SLACK_WEBHOOK_URL, { text: `📝 To-Do Summary:\n${summary}` });
    
    res.json({ message: "Summary sent to Slack!", summary });
  } catch (error) {
    console.error("Error in summarization:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to summarize or send to Slack." });
  }
});