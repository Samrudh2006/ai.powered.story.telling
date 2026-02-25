import express from 'express';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || '';

let isMongoConnected = false;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    isMongoConnected = true;
  }).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
} else {
  console.log('No MONGODB_URI provided, using in-memory fallback.');
}

const storySchema = new mongoose.Schema({
  title: String,
  content: String,
  genre: String,
  progress: Number,
  wordCount: Number,
  isShared: { type: Boolean, default: false },
  authorName: String,
  versions: [{ content: String, timestamp: { type: Date, default: Date.now } }],
  updatedAt: { type: Date, default: Date.now }
});
const Story = mongoose.model('Story', storySchema);

let fallbackStories = [
  { _id: '1', title: 'The Last Nebula', content: 'The stars over Neo-Veridia were never meant to fade. Kaelen watched as the last shimmer of the indigo nebula dissolved into the void. "It\'s happening," he whispered into the comms, his voice steady despite the trembling of his hands.\n\nBehind him, the rhythmic hum of the atmospheric stabilizers was the only sound in the observation deck. For centuries, the nebula had provided the energy that fueled the world below. Now, as the color drained from the sky, a heavy, silent darkness began to settle over the city\'s spires.', genre: 'Sci-Fi', progress: 45, wordCount: 1248, isShared: false, authorName: 'Julian Barnes', versions: [], updatedAt: new Date() },
  { _id: '2', title: 'The Whispering Woods', content: 'Chapter 12: The Lost Clearing...', genre: 'Fantasy', progress: 65, wordCount: 14200, isShared: false, authorName: 'Julian Barnes', versions: [], updatedAt: new Date() },
  { _id: '3', title: 'Neon Shadows', content: 'Prologue: Zero Hour...', genre: 'Cyberpunk', progress: 15, wordCount: 2100, isShared: false, authorName: 'Julian Barnes', versions: [], updatedAt: new Date() },
  { _id: '4', title: 'Echoes of Eternity', content: 'The ancient clock ticked backwards...', genre: 'Mystery', progress: 80, wordCount: 34000, isShared: true, authorName: 'Sarah Chen', versions: [], updatedAt: new Date() },
  { _id: '5', title: 'Crimson Tides', content: 'The sea was red that morning...', genre: 'Thriller', progress: 30, wordCount: 8500, isShared: true, authorName: 'Marcus Vance', versions: [], updatedAt: new Date() }
];

app.get('/api/stories', async (req, res) => {
  if (isMongoConnected) {
    try {
      const stories = await Story.find().sort({ updatedAt: -1 });
      res.json(stories);
    } catch (e) {
      res.status(500).json({ error: 'DB Error' });
    }
  } else {
    res.json(fallbackStories);
  }
});

app.post('/api/stories', async (req, res) => {
  if (isMongoConnected) {
    try {
      const story = new Story({ ...req.body, updatedAt: new Date() });
      await story.save();
      res.json(story);
    } catch (e) {
      res.status(500).json({ error: 'DB Error' });
    }
  } else {
    const newStory = { _id: Date.now().toString(), ...req.body, updatedAt: new Date() };
    fallbackStories.unshift(newStory);
    res.json(newStory);
  }
});

app.get('/api/stories/:id', async (req, res) => {
  if (isMongoConnected) {
    try {
      const story = await Story.findById(req.params.id);
      if (!story) return res.status(404).json({ error: 'Not found' });
      res.json(story);
    } catch (e) {
      res.status(500).json({ error: 'DB Error' });
    }
  } else {
    const story = fallbackStories.find(s => s._id === req.params.id);
    if (!story) return res.status(404).json({ error: 'Not found' });
    res.json(story);
  }
});

app.put('/api/stories/:id', async (req, res) => {
  if (isMongoConnected) {
    try {
      const story = await Story.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
      res.json(story);
    } catch (e) {
      res.status(500).json({ error: 'DB Error' });
    }
  } else {
    const index = fallbackStories.findIndex(s => s._id === req.params.id);
    if (index !== -1) {
      fallbackStories[index] = { ...fallbackStories[index], ...req.body, updatedAt: new Date() };
      res.json(fallbackStories[index]);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  }
});

app.post('/api/stories/:id/versions', async (req, res) => {
  const { content } = req.body;
  if (isMongoConnected) {
    try {
      const story = await Story.findById(req.params.id);
      if (!story) return res.status(404).json({ error: 'Not found' });
      story.versions.push({ content, timestamp: new Date() });
      await story.save();
      res.json(story);
    } catch (e) {
      res.status(500).json({ error: 'DB Error' });
    }
  } else {
    const story = fallbackStories.find(s => s._id === req.params.id);
    if (!story) return res.status(404).json({ error: 'Not found' });
    if (!story.versions) story.versions = [];
    story.versions.push({ content, timestamp: new Date() });
    res.json(story);
  }
});

app.post('/api/ai/suggest', async (req, res) => {
  try {
    const { context, prompt } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ suggestion: "AI suggestion unavailable: GEMINI_API_KEY not set. This is a mock suggestion based on your prompt: " + prompt });
    }
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}\n\nPrompt: ${prompt}\n\nProvide a continuation or suggestion for the story based on the context and prompt. Keep it concise, around 1-2 paragraphs.`,
    });
    res.json({ suggestion: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate AI suggestion' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
