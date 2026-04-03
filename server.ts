import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_MODEL = 'google/gemma-3-27b-it';

// AI proxy – keeps the API key server-side
app.post('/api/ai', async (req, res) => {
  try {
    const { messages, systemPrompt, maxTokens } = req.body as {
      messages: { role: string; content: string }[];
      systemPrompt?: string;
      maxTokens?: number;
    };

    if (!process.env.NVIDIA_API_KEY) {
      res.status(500).json({ error: 'NVIDIA_API_KEY is not configured.' });
      return;
    }

    const builtMessages: { role: string; content: string }[] = [];
    if (systemPrompt) {
      builtMessages.push({ role: 'system', content: systemPrompt });
    }
    builtMessages.push(...messages);

    const payload = {
      model: NVIDIA_MODEL,
      messages: builtMessages,
      max_tokens: maxTokens ?? 1024,
      temperature: 0.70,
      top_p: 0.70,
      stream: false,
    };

    const upstream = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      const errorText = await upstream.text();
      res.status(upstream.status).json({ error: errorText });
      return;
    }

    const data = await upstream.json() as { choices: { message: { content: string } }[] };
    res.json({ text: data.choices[0].message.content });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
